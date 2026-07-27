import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import leadRoutes from "./routes/lead.route.js";
import userRoutes from "./routes/user.route.js"
import path from 'path'

const app = express();
const __dirname = path.resolve()  // it will give the path of the backend folder

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/user",userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.use((_,res)=>{
  res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})
export default app;