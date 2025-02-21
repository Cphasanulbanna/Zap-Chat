const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: ["http://127.0.0.1:5500"], // frontend origin
    }
})

io.on("connection", (socket) => {
    console.log(socket.id); //random id generated for each person when connected

    socket.on("send-message", (message) => {
        console.log(message, "message");
        
    })
    
})