import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB Connnected");
  } catch (error) {
    console.log("Error At DB Connecting");
    process.exit(1);
  }
};
