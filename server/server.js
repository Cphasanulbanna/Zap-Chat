const { Server } = require("socket.io");
const {instrument} = require("@socket.io/admin-ui") 

const io = new Server(3000, {
    cors: {
        origin: ["http://localhost:5500", "https://admin.socket.io"],
        credentials: true
        //  // frontend origin
    }
})

io.on("connection", (socket) => {
    console.log(socket.id); //random id generated for each person when connected

    socket.on("send-message", (message, room) => {
            if(room==="") {
                const  msgObj = {message, time: new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  })}
                socket.broadcast.emit("receive-message", msgObj);
        // sends message to all connected clients
            }
            else {
                socket.to(room).emit('receive-message', message);
            }
    })

    socket.on("join-room", (room, cb) => {
        socket.join(room);
        const formattedMsg = `Joined room:${room}, ${new Date()}`
        cb(formattedMsg) 
    })
    
})

instrument(io, {auth: false})