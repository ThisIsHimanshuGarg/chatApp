
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";

const verifyToken = async(req, res ,next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]
        // console.log(token);

        const decoded = jwt.verify(token , process.env.JWT_SECRET )
        // console.log(decoded);

        const user = await User.findById(decoded.userId).select("-password")
        // console.log(user)

        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("jwt verification error", error.message);
    }
}
export default verifyToken