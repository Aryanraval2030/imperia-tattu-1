import express from "express";

import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(createAppointment).get(protect, getAppointments);

router
  .route("/:id")
  .get(protect, getAppointmentById)
  .patch(protect, updateAppointment)
  .delete(protect, deleteAppointment);

export default router;
