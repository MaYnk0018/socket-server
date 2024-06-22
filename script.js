const socket = io("http://localhost:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
socket.on("chat-message", (data) => {
  appendMessage(`${data.naam}: ${data.message}`);
});
socket.on("user-connected", (naam) => {
    appendMessage(`${naam} connected`);
  });
  socket.on("disconnected", (naam) => {
    appendMessage(`${naam} disconnected`);
  });

const naam = prompt("whatv is you name");
appendMessage("connected ");
socket.emit('new-user', naam)

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("chat-message", message);
  appendMessage(`you :${message}`);
  messageInput.value = "";
});

function appendMessage(data) {
  const messageElement = document.createElement("div");
  messageElement.innerText = data;
  messageContainer.append(messageElement);
}
