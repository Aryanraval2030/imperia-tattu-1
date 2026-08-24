import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,

      required: [true, "Please provide a quote"],

      trim: true,
    },

    name: {
      type: String,

      required: [true, "Please provide a name"],

      trim: true,
    },

    detail: {
      type: String,

      required: [true, "Please provide details (e.g. tattoo type)"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Testimonial", TestimonialSchema);
