const { io } = require("socket.io-client");

const createClient = (name, interval) => {
    const socketClient = io("http://localhost:3000/");

    socketClient.on("connect", () => {
        console.log(`${name} Connected to Localhost:3000`);
        setInterval(() => {
            socketClient.emit("newRandom", `Message from Server ${name}`);
        }, interval);
    });

    socketClient.on("disconnect", () => {
        console.log(`${name} Disconnected to Localhost:3000`);
    });
};

createClient('NSV-1', 2000);
createClient('NSV-2', 4500);