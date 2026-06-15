
import { Server } from "socket.io";
import socketAuth from "../middleware/socket.js";

let io;

const userSocketMap = {};

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    });

    // middleware
    io.use(socketAuth);

    io.on("connection", (socket) => {
        console.log("user connected", socket.user?.name);

        const userId = socket.userId;

        if (userId) {
            userSocketMap[userId] = socket.id;

            console.log("Online Users:", userSocketMap);

            socket.join(userId.toString());

            io.emit("onlineUser", Object.keys(userSocketMap));
        }

        socket.on("disconnect", () => {
            if (userId) {
                delete userSocketMap[userId];
                io.emit("onlineUser", Object.keys(userSocketMap));
            }
        });
    });

    return io;
};

const getIO = () => {
    return io;
};

export { initSocket, getIO };
