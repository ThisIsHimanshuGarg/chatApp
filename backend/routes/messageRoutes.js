import express from "express"
import verifyToken from "../middleware/veriifyToken.js";
import upload from "../middleware/multer.js";
import {getUserById,sendMessage,getMessage} from "../controllers/message.controller.js";
import uploadToCloudinary from "../middleware/cloudniary.js";
const messageRouter = express.Router()

messageRouter.get("/users/:id", verifyToken, getUserById)

messageRouter.post("/send-message/:receiverId", verifyToken, upload.array("files"), uploadToCloudinary, sendMessage)
messageRouter.get("/get-message/:userId", verifyToken,  getMessage)
export default  messageRouter;