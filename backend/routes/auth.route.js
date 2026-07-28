import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,getCurrentAdmin,
  refreshAccessToken,

} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post('/refresh',refreshAccessToken)
router.post("/logout",isAuthenticated, logoutAdmin);
router.get("/me", isAuthenticated, getCurrentAdmin);

export default router;