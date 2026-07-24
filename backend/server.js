import express from "express";
import dotenv from "dotenv";
import pool from "./db/db.js";

dotenv.config();

const app = express();

// middleware..
app.use(express.json());

const PORT = process.env.PORT || 5000;

// for creating connection and starting the server..
const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log("mysql connected successfully");
    });
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
  }
};

startServer();