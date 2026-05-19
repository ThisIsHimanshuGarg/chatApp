import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    minlength:8,
  },
  profilepic:{

    type:String,
    default:"",
  },
});

const User = mongoose.model("User", userSchema);

export default User;