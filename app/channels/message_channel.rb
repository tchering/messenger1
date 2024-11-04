class MessageChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "message"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # but we dont need this becuase the message is being broadcasted from the messages_controller not from javascript in notification_channel.js. We have already commented that code .
  # def receive(data)
  #   ActionCable.server.broadcast("message", data)
  # end
end
