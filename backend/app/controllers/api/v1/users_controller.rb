class Api::V1::UsersController < ApplicationController
  before_action :authorize_access_request!

 def me
  puts "Payload: #{payload.inspect}" # Debug log
  user = User.find(payload['user_id'])
  render json: { user: { id: user.id, email: user.email } }
end
end