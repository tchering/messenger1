import consumer from "channels/consumer";

consumer.subscriptions.create("NotificationChannel", {
  connected() {
    console.log("Connected to the notification channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Get the current user's ID (assuming it's available in a global variable or meta tag)
    const currentUserIdMeta = document.querySelector(
      "meta[name='current-user-id']"
    );
    if (!currentUserIdMeta) {
      console.error("Meta tag for current user ID not found");
      return;
    }
    const currentUserId = currentUserIdMeta.getAttribute("content");

    // Skip showing the notification if the current user is the sender
    if (data.sender_id == currentUserId) {
      return;
    }

    // Skip showing the notification if the user is on the chat page
    if (document.querySelector("#chat-room")) {
      return;
    }
    // Play notification sound
    const audio = new Audio("/notification.wav");
    audio.play();

    // Called when there's incoming data on the websocket for this channel
    const chatLink = document.querySelector("#chat-link");
    if (chatLink) {
      // Remove any existing notification badge
      const existingBadge = chatLink.querySelector(".notification-badge");
      if (existingBadge) {
        existingBadge.remove();
      }

      // Create a small notification badge
      const notificationBadge = document.createElement("span");
      notificationBadge.textContent = "New";
      notificationBadge.className = "notification-badge";
      notificationBadge.style.color = "red";
      notificationBadge.style.marginLeft = "10px";
      notificationBadge.style.fontWeight = "bold";

      // Append the notification badge to the chat link
      chatLink.appendChild(notificationBadge);
    }
  },
});
