import express from "express";
import {
  subscribeNewsletter,
  getSubscribers,
} from "../controllers/newsletterController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(subscribeNewsletter).get(protect, getSubscribers);

export default router;
