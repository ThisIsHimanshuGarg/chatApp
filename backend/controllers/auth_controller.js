
import User from "../models/userSchema.js";

const signUp = async (req, res) => {
    console.log("hello");
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

export {signUp};