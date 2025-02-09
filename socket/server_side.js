const express = require("express");
const createServer = require('http').createServer
const socketIo = require("socket.io");

const app = express();
const server = createServer(app);
const websocket = socketIo(server);

websocket.on("connection", (socket) => {
    console.log(`Conntected to ${socket.client.id}`);
    
    socket.on("newRandom", data => {
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log(`Disconnected from ${socket.client.id}`);
    });
});

server.listen(3000, () => {
    console.log("Server Waiting for connection on localhost:3000");
});
