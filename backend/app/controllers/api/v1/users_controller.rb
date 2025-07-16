class Api::V1::UsersController < ApplicationController
  before_action :authorize_access_request!

  def me
    user = User.find(payload['user_id'])
   puts payload.inspect
    render json: { user: { id: user.id, email: user.email } }
  end
end