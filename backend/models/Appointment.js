import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },

    appointmentDate: {
      type: Date,
      required: [true, "Please provide an appointment date"],
    },

    appointmentTime: {
      type: String,
      required: [true, "Please provide an appointment time"],
    },

    tattooType: {
      type: String,
      required: [true, "Please provide tattoo type"],
    },

    tattooSize: {
      type: String,
      required: [true, "Please provide tattoo size"],
    },

    notes: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Appointment", AppointmentSchema);
