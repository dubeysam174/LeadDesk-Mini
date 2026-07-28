import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middleware/auth.middleware.js";
import isUserAuthenticated from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.post("/logout",isUserAuthenticated, logoutUser);
router.get("/me", isUserAuthenticated, getCurrentUser);

export default router;