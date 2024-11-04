class MessageChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "message"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # receive the data sent from message_channel.js and broadcast it to all subscribers including the sender
  def receive(data)
    # This is where broadcasting should happen
    data["user"] = current_user
    # message = current_user.messages.create!(body: data["message"]["body"])
    ActionCable.server.broadcast("message", data)
  end

  # def receive(data)
  #   # This is where broadcasting should happen
  #   data["user"] = current_user
  #   message = current_user.messages.create!(body: data["message"]["body"])
  #   ActionCable.server.broadcast("message", data)
  # end
end
