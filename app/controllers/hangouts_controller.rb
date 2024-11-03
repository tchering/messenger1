class HangoutsController < ApplicationController
  def index
    @messages = Message.includes(:user)
  end
end
