import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import router from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

let port=process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json())

app.use("/api",router);

app.listen(port, () => {

  console.log(`Server running on port ${port}`);
  connectDB();
});
