// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/api", (req, res) => {
    res.json({message: "Hello from the server!"});
});

const socketToRoom = {}; // maps socket.id to roomName
const roomToSockets = {}; // maps roomName to list of socket.id 

function collectRooms() {
    return Object.keys(roomToSockets);
}

function containsRoom(roomName) {
    const rooms = collectRooms();
    for (var i = 0; i < rooms.length; i++) {
        if (rooms[i] === roomName) return true;
    }
    return false;
}

function removeSocketFromAllRooms(socketId) {
    collectRooms().forEach(room => {
        roomToSockets[room] = roomToSockets[room].filter(joinedSocketId => joinedSocketId != socketId);
    });
}

io.on("connection", (socket) => {
    console.log("a user connected: " + socket.id);
    socket.on("disconnect", () => {
        delete socketToRoom[socket.id];
        removeSocketFromAllRooms(socket.id);
        console.log("a user disconnected: " + socket.id);
    });
    socket.on('createRoom', (roomName, callback) => {
        let error = true;
        if (!containsRoom(roomName)) {
            error = false;
            socketToRoom[socket.id] = roomName;
            roomToSockets[roomName] = [socket.id];
            socket.join(roomName);
        }
        callback({ error });
    });
    socket.on('joinRoom', (roomName, callback) => {
        let error = true;
        let roomSize = -1;
        if (containsRoom(roomName)) {
            error = false;
            socketToRoom[socket.id] = roomName;
            roomToSockets[roomName].push(socket.id);
            socket.join(roomName);
            roomSize = roomToSockets[roomName].length;
            io.in(roomName).emit('roomUpdate', roomSize);
        }
        callback({ error, roomSize });
    });
    socket.on('creatorStartGame', (callback) => {
        const roomName = socketToRoom[socket.id];
        socket.to(roomName).emit('startGame');
        callback({ error: false });
    });
    socket.on('drawerSelectWord', (word, callback) => {
        const roomName = socketToRoom[socket.id];
        socket.to(roomName).emit('selectWord', word);
        callback({ error: false });
    });
    socket.on('drawerDraw', (...strokes) => {
        const roomName = socketToRoom[socket.id];
        socket.to(roomName).emit('draw', ...strokes);
    });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});