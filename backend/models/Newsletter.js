import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,

      required: [true, "Please provide an email"],

      unique: true,

      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,

        "Please provide a valid email",
      ],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Newsletter", NewsletterSchema);
