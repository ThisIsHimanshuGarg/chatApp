import express from "express";
import dotenv from "dotenv";
// import connectDB from "./config/dbConnection.js";
// import router from "./routes/authRoutes.js";
dotenv.config();

let port=process.env.PORT || 3000;

const app = express();
 app.use(express.json())

// app.use("/api",router);

app.get("/",(req,res)=>{
     res.send("server connect");
})

app.listen(port, () => {

  console.log(`Server running on port ${port}`);
  // connectDB();
});
