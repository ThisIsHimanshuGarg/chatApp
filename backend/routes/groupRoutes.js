import express from "express"
import { createGroup,getGroup } from "../controllers/group.controller.js";
import verifyToken from "../middleware/veriifyToken.js";
import upload from "../middleware/multer.js";
import uploadToCloudinary from "../middleware/cloudniary.js";

const router = express.Router()

router.post("/create-group",verifyToken, upload.single("group_icon"),uploadToCloudinary, createGroup)
router.get("/get-group/:groupId",verifyToken, getGroup)

export default  router;