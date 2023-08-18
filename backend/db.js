import mongoose from "mongoose";
import { URI } from "./config/config.js";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log(`Connected to ${db.connection.name}`);
  } catch (error) {
    console.error(error);
  }
};
