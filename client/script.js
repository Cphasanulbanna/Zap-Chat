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
const roomButton = document.getElementById("room-button")


chatForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const message = messageInput.value
    const room = roomInput.value

    if(message === "") return

    socket.emit("send-message", message, room)
    messageInput.value = ""
})

function displayMessage(msgObj) {
    console.log({msgObj});
    
   const messageTag = document.createElement("p")
   const timeTag =  document.createElement("p")
   messageTag.innerHTML = msgObj.message
   timeTag.innerHTML = msgObj.time
   messageTag.classList.add("message")
   chatScreen.append(messageTag)
   chatScreen.append(timeTag)
}



roomButton.addEventListener("click", () => {
    const room = roomInput.value
    socket.emit('join-room', room, message => {
        displayMessage(message)
    })
})



document.addEventListener("keydown", (e)=> {
    if(e.target.matches("input")) return

    if(e.key === 'c') socket.connect()
    if(e.key === 'd') socket.disconnect()
})