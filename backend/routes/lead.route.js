import express from "express";
import {
  addLead,
  fetchLeads,
  changeLeadStatus,
} from "../controllers/lead.controller.js";

import isAuthenticated from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", addLead);

router.get("/", isAuthenticated, fetchLeads);

router.patch("/:id/status", isAuthenticated, changeLeadStatus);

export default router;