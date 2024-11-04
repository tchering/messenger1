class HangoutsController < ApplicationController
  before_action :authenticate_user!

  def index
    # @message = Message.new
    # @messages = Message.includes(:user).all
  end

  def chat
    @message = Message.new
    @messages = Message.includes(:user).all
  end
end
