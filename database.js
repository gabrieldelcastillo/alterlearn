import mongoose from "mongoose";
import { MONGODB_URI_WEB } from "./config.js";

const connectdb = async (app) => {
  try {
    const db = await mongoose.connect(MONGODB_URI_WEB);
    console.log("Connected to ", db.connection.name);
  } catch (error) {
    console.error(error);
  }

  mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected");
  });
};
export default connectdb;