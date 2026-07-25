import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import leadRoutes from "./routes/lead.route.js";
import path from 'path'

const app = express();
const _dirname = path.resolve()  // it will give the path of the backend folder

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

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.use((_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
export default app;