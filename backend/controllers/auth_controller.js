
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
  { expiresIn: "7d" }
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
const getProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const getUser = await User.findById(userId).select("-password");
        res.status(200).json({
            message: " Get Profile",
            user: getUser
        });
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
};
    const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id

        const updateData = {...req.body}

        if (req.body.name) {
            updateData.name = req.body.name
        }
        if (req.body.email) {
            updateData.email = req.body.email
        }
          
        console.log("image url", req.imageUrl);

        if (req.imageUrl) {
            updateData.profilePic =  req.imageUrl[0]
        }
        const updateUser = await User.findByIdAndUpdate(userId, updateData, { new: true })

        res.status(200).json({
            message: "Profile update successfully",
            data: updateUser
        })
    } catch (error) {

    }
}
const getAllContacts = async (req, res) => {
    try {
        const logingUserId = req.user._id;
        const query = { _id: { $ne: logingUserId } }
        const user = await User.find(query)

        res.status(200).json({
            message: "get all contacts list",
            data: user
        })
    } catch (error) {

    }
}
const imageupload = async (req, res) => {
    try {
        console.log(req.file)

        res.status(200).json({
            message: "image upload",
            file: req.file,
            image: req.imageUrl
        })
    } catch (error) {

    }
}

const googleLogin = async (req, res) => {
    try {
        const { email, name, profilePic, googleId } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                email, name, profilePic, googleId
            })
        } else {
            user.name = name;
            user.profilePic = profilePic;
            user.googleId = googleId
            await user.save()
        }
        const payload = {
            userId: user._id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });

        res.status(200).json({
            message: "login successfully",
            data: { user, token },
        });
    } catch (error) {
        console.log("google login error", error);
        res.status(500).json({ message: "server error" })
    }
};




export {signUp , login,getProfile,updateProfile,getAllContacts,imageupload,googleLogin};