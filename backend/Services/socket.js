
import { Server } from "socket.io";
import socketAuth from "../middleware/socket.js";
let io;

const userSocketMap = {}
const initSocket = async (server) => {
    io = new Server(server, {
        cors: { origin: "*" }
    })
    io.use(socketAuth)

    io.on("connection", (socket) => {
        console.log("user connected", socket.user.name);
        const userId = socket.userId
        userSocketMap[userId] = socket.id
        console.log(userSocketMap);
        io.emit("onlineUser", Object.keys(userSocketMap))
    })
}
export default initSocket 