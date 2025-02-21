const io = require('socket.io')(3000, {
    cors:  {
        origin: ["https://localhost:8080"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id); //random id generated for each person when connected
    
})