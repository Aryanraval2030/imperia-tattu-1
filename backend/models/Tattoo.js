import mongoose from "mongoose";

const TattooSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Please provide a category"],

      enum: [
        "Black & Grey",
        "Realism",
        "Traditional",
        "Fine Line",
        "Japanese",
        "Minimal",
      ],
    },

    image: {
      type: String,
      required: [true, "Please provide an image URL"],
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Tattoo", TattooSchema);
