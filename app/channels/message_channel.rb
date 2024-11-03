class MessageChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "message"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    # This is where broadcasting should happen
    data["user"] = current_user

    ActionCable.server.broadcast("message", data)
  end

  # def receive(data)
  #   # This is where broadcasting should happen
  #   data["user"] = current_user
  #   message = current_user.messages.create!(body: data["message"]["body"])
  #   ActionCable.server.broadcast("message", data)
  # end
end
