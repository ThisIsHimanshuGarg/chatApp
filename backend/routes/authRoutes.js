import express from "express"
import { signUp ,login } from "../controllers/auth_controller.js"

const router=express.Router();
router.post("/signup", signUp);
router.post("/login", login);

export default router;