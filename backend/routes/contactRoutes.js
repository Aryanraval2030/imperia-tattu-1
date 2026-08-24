import express from "express";

import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(createContact).get(protect, getContacts);

router.route("/:id").delete(protect, deleteContact);

export default router;
