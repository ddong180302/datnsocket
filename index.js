const { Server } = require("socket.io");

let onlineUsers = [];

const io = new Server({ cors: { origin: "http://localhost:3000", methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH"] } });

io.on("connection", (socket) => {
    socket.on("connectUser", (userId) => {
        if (!onlineUsers.includes(userId)) {
            onlineUsers.push(userId);
        }
        io.emit("updateOnlineUsers", onlineUsers);
    });


    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
        io.emit("getNotification", {
            senderId: message.sender,
            isRead: false,
            date: new Date(),
        })
    });



    socket.on("disconnectUser", (userId) => {
        onlineUsers = onlineUsers.filter(user => user !== userId);
        io.emit("updateOnlineUsers", onlineUsers);
    });
});

io.listen(4000);