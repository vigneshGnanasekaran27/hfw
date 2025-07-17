class Api::V1::UsersController < ApplicationController
  before_action :authorize_access_request!, except: [:create]

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(params[:id])
    render json: { user: user }
  end

  def me
    render json: { user: current_user }
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
