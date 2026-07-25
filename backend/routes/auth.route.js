import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,getCurrentAdmin,

} from "../controllers/auth.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/me", isAuthenticated, getCurrentAdmin);

export default router;