// server/index.js

const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socketToRoom = {}; // maps socket.id to roomName
const roomToSockets = {}; // maps roomName to list of socket.id 
const roomToCorrectGuesses = {}; // maps roomName to the # of correct guesses
const roomToDrawerIndex = {}; // maps roomName to index of the drawer socket for the game

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

function getSocketRoomIndex(socketId) {
    const roomName = socketToRoom[socketId];
    const sockets = roomToSockets[roomName];
    for (var i = 0; i < sockets.length; i++) {
        if (sockets[i] === socketId) return i;
    }
    // error
    return null;
}

function removeSocketFromAllRooms(socketId) {
    collectRooms().forEach(room => {
        roomToSockets[room] = roomToSockets[room].filter(joinedSocketId => joinedSocketId != socketId);
        if (roomToSockets[room].length === 0) {
            delete roomToSockets[room];
        }
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
        roomToCorrectGuesses[roomName] = 0;
        roomToDrawerIndex[roomName] = getSocketRoomIndex(socket.id);
        socket.to(roomName).emit('startGame');
        callback({ error: false });
    });
    socket.on('drawerSelectWord', (word) => {
        const roomName = socketToRoom[socket.id];
        socket.to(roomName).emit('selectWord', word);
    });
    socket.on('drawerDraw', (...strokes) => {
        const roomName = socketToRoom[socket.id];
        socket.to(roomName).emit('draw', ...strokes);
    });
    socket.on('getRoomSize', (callback) => {
        const roomName = socketToRoom[socket.id];
        const roomSize = roomToSockets[roomName].length;
        callback({ error: false, roomSize});
    });
    socket.on('guesserNewGuess', (newGuess) => {
        const roomName = socketToRoom[socket.id];
        const drawerIndex = roomToDrawerIndex[roomName];
        const drawerSocket = roomToSockets[roomName][drawerIndex];
        socket.to(drawerSocket).emit('guess', newGuess);
    })
    socket.on('guesserCorrect', () => {
        const roomName = socketToRoom[socket.id];
        roomToCorrectGuesses[roomName]++;
        const correctGuesses = roomToCorrectGuesses[roomName];
        io.in(roomName).emit('guesserCorrectUpdate', correctGuesses);
    });
    socket.on('roundOver', () => {
        const roomName = socketToRoom[socket.id];
        const socketsInRoom = roomToSockets[roomName];
        roomToCorrectGuesses[roomName] = 0;
        const currIndex = roomToDrawerIndex[roomName];
        nextIndex = currIndex === socketsInRoom.length-1 ? 0 : currIndex + 1;
        roomToDrawerIndex[roomName] = nextIndex;
        // tell all sockets there is a new round, socket with nextIndex as drawer
        for (var i = 0; i < socketsInRoom.length; i++) {
            io.to(socketsInRoom[i]).emit('newRound', i === nextIndex);
        }
    })
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({message: "Hello from the server!"});
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});