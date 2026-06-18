import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require:true,
  },

  email: {
    type: String,
    unique: true,
    require:true,
    
  },

  password: {
    type: String,
    minlength:8,
    require:true,
  },

  profilepic:{

    type:String,
    default:"",
  },
  googleId:{
        type:String
    },
});

const User = mongoose.model("User", userSchema);

export default User;