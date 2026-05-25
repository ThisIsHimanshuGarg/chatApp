
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
       
    res.status(201).json({
      message: "Account Created Successfully",
      data: newUser,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login Api

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // check password
    if (user.password !== password) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

       
const payload = {
  id: user._id,
  name: user.name,
  email: user.email,
};

const token = jwt.sign(
  payload,
  process.env.JWT_SECRET,
  { expiresIn: "1m" }
);

console.log(token);
    // success response
    res.status(200).json({
      message: "Login successful",
      token,
     user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export {signUp , login};