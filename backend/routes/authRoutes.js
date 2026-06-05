import express from "express"
import { signUp ,login , getProfile,getAllContacts,updateProfile} from "../controllers/auth_controller.js"
import verifyToken from "../middleware/veriifyToken.js";
import upload from "../middleware/multer.js";
import { imageupload } from "../controllers/auth_controller.js";
import uploadToCloudinary from "../middleware/cloudniary.js";

const router=express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getProfile" ,verifyToken,  getProfile)
router.get("/getAllContacts" ,verifyToken,  getAllContacts)
router.put("/updateProfile" ,verifyToken, upload.single("profileImage"),uploadToCloudinary, updateProfile)
router.post("/imageupload" ,upload.single("file") ,uploadToCloudinary ,imageupload )



export default router;