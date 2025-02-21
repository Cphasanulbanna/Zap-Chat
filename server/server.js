const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: ["http://localhost:5500"], // frontend origin
    }
})

io.on("connection", (socket) => {
    console.log(socket.id); //random id generated for each person when connected

    socket.on("send-message", (message) => {
        io.emit("receive-message", message); // sends message to all connected clients
        
    })
    
})