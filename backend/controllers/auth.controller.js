import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAdmin, findAdminByEmail, saveRefreshToken } from "../models/admin.model.js";
import sendToken from "../utils/sendToken.js";
import {generateAccessToken,generateRefreshToken} from '../utils/generateToken.js'
import { getRefreshToken } from "../models/admin.model.js";


// Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if admin already exists
    const existingAdmin = await findAdminByEmail(email);

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save Admin
    await createAdmin(email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find Admin
    const admin = await findAdminByEmail(email);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate Tokens
    const accessToken = generateAccessToken(admin.id);
    const refreshToken = generateRefreshToken(admin.id);

    // Save Refresh Token in DB
    await saveRefreshToken(admin.id, refreshToken);

    // Send Response
   return  sendToken(res, accessToken, refreshToken);
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout Admin
export const logoutAdmin = async (req, res) => {
  try {
    // If req.admin exists from middleware
    await removeRefreshToken(req.admin.id);

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getCurrentAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: {
        id: req.admin.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//refrshaccesstoken...
export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const savedToken = await getRefreshToken(decoded.id);

    if (savedToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessToken(decoded.id);

    return res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Refresh token expired or invalid",
    });
  }
};