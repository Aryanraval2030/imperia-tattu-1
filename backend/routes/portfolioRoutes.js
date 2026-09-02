import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/", getPortfolios);
router.post("/", protect, createPortfolio);
router.put("/:id", protect, updatePortfolio);
router.delete("/:id", protect, deletePortfolio);

export default router;
