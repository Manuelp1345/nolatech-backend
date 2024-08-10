import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constants";

let connection: mongoose.Mongoose;

export const connectionDB = async () => {
  if (connection && connection.connection.readyState === 1) {
    return connection;
  }
  try {
    connection = await mongoose.connect(MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database", error);
    throw new Error("Error connecting to database");
  }
  return connection;
};
