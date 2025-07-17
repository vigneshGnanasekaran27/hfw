class Api::V1::AuthController < ApplicationController
  def login
    user = User.find_by!(email: params[:email])

    if user.authenticate(params[:password])
      payload = { user_id: user.id }

      session = JWTSessions::Session.new(
        payload: payload,
        refresh_by_access_allowed: true # ✅ This is required
      )

      tokens = session.login

      response.set_cookie(JWTSessions.access_cookie,
                          value: tokens[:access],
                          httponly: true,
                          same_site: Rails.env.production? ? :none : :lax,
                          secure: true)

      response.set_cookie(JWTSessions.refresh_cookie,
                          value: tokens[:refresh],
                          httponly: true,
                          same_site: Rails.env.production? ? :none : :lax,
                          secure: true)

      render json: { csrf: tokens[:csrf], user_id: user.id }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
end
