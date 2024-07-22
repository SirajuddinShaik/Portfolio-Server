import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import Faculty from "./models/faculty.js";

import bcrypt from "bcryptjs";

// import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/project", projectRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/login", loginRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Hello to college erp API");
});
mongoose
  .connect(
    "mongodb+srv://test:1234@project.lzqdkln.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("Mongo Error", error.message));
