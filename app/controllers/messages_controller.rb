class MessagesController < ApplicationController
  def create
    @message = current_user.messages.build(message_params)
    @message.save
    ActionCable.server.broadcast("message", @message.as_json(include: :user))
    ActionCable.server.broadcast("notification_channel", { notification: "New", sender_id: current_user.id })
    # Handle the case where the message is not saved
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
