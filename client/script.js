import { io } from "socket.io-client"
import "./styles.css";

const socket = io("http://localhost:3000")

socket.on("connect", () => {
    console.log(`Connected to the server with id ${socket.id}`);
    const connectionIdContainer = document.getElementById("connection-id");
    if (connectionIdContainer) {
        connectionIdContainer.innerHTML = socket.id;
    }
})

socket.on("receive-message", (message) => {
    console.log(message, 'message');
    
    displayMessage(message)
})

const chatForm = document.getElementById("chat-form")
const messageInput = document.getElementById("message-input")
const chatScreen = document.querySelector(".screen")

const roomInput = document.getElementById("room-input")


chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const message = messageInput.value
    const room = roomInput.value

    // if(message === "") return

    socket.emit("send-message", message, room)
    messageInput.value = ""
})

function displayMessage(message) {
   const messageTag = document.createElement("p")
   messageTag.innerHTML = message
   messageTag.classList.add("message")
   chatScreen.append(messageTag)
}

