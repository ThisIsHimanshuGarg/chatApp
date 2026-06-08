import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import router from "./routes/authRoutes.js";
import cors from "cors";
import  initSocket  from "./Services/socket.js";
import { createServer } from "http";


dotenv.config();

let port=process.env.PORT || 3000;

const app = express();
const server = createServer(app)

app.use(cors());
app.use(express.json())

app.use("/api",router);


initSocket(server);

server.listen(port, () => {
  console.log(`server is running port ${port}`);
  connectDB()
})
