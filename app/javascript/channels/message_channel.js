import consumer from "channels/consumer";

consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to the message channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  // Now data is received from the server after it has broadcasted and we need to display it on the page
  received(data) {
    // Called when there's incoming data on the websocket for this channel
    const messageDisplay = document.querySelector("#message-display");
    messageDisplay.insertAdjacentHTML("beforeend", this.template(data));
    document.querySelector("#message-input").value = "";
  },

  template(data) {
    return `<article class="message">
      <div class="message-header">
        ${data.user.email}
      </div>
      <div class="message-body">
        ${data.body}
      </div>
    </article>`;
  },
});

// This js file will capture the form submission event and send the message to the server message channel.rb file
// document.addEventListener("turbo:load", () => {
//   let form = document.querySelector("#message-form");
//   if (form) {
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       let messageInput = document.querySelector("#message-input").value;
//       if (messageInput == "") return;
//       const message = {
//         body: messageInput,
//       };
//       messageChannel.send({ message: message });
//       document.querySelector("#message-input").value = "";
//     });
//   }
// });
