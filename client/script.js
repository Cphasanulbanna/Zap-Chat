import { io } from "socket.io-client"

const socket = io("http://localhost:3000")

socket.on("connect", () => {
    console.log(`Connected to the server with id ${socket.id}`);
})

socket.on("receive-message", (message) => {
    displayMessage(message)
})

const chatForm = document.getElementById("chat-form")
const messageInput = document.getElementById("message-input")
const chatScreen = document.querySelector(".screen")


chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const message = messageInput.value
    if(message === "") return

    socket.emit("send-message", message)
    messageInput.value = ""
})

function displayMessage(message) {
   const messageTag = document.createElement("p")
   messageTag.innerHTML = message
   chatScreen.append(messageTag)
   
}