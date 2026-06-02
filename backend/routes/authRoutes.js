import express from "express"
import { signUp ,login , getProfile,getAllContacts,updateProfile} from "../controllers/auth_controller.js"
import verifyToken from "../middleware/veriifyToken.js";

const router=express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getProfile" ,verifyToken,  getProfile)
router.get("/getAllContacts" ,verifyToken,  getAllContacts)
router.put("/updateProfile" ,verifyToken,  updateProfile)


export default router;