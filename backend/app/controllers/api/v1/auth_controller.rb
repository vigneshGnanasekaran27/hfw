# app/controllers/api/v1/auth_controller.rb
class Api::V1::AuthController < ApplicationController
  include JWTSessions::RailsAuthorization
  rescue_from JWTSessions::Errors::Unauthorized, with: :not_authorized

 def login
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      payload = { user_id: user.id }
      session = JWTSessions::Session.new(payload: payload, refresh_by_access_allowed: true)
      tokens = session.login

      set_jwt_cookies(tokens)
      puts "tokens", tokens
      render json: { access: tokens[:access], csrf: tokens[:csrf] }
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  def refresh
    session = JWTSessions::Session.new(refresh_by_access_allowed: true)
    tokens = session.refresh_by(refresh_token: cookies[JWTSessions.refresh_cookie])
    set_jwt_cookies(tokens)
    render json: { csrf: tokens[:csrf] }
  end

  def logout
    session = JWTSessions::Session.new
    session.flush_by_access_payload
    render json: { message: 'Logged out' }
  end

  private

  def set_jwt_cookies(tokens)
    response.set_cookie(JWTSessions.access_cookie,
                        value: tokens[:access],
                        httponly: true,
                        same_site: :lax,
                        secure: Rails.env.production?)

    response.set_cookie(JWTSessions.refresh_cookie,
                        value: tokens[:refresh],
                        httponly: true,
                        same_site: :lax,
                        secure: Rails.env.production?)
  end
end
