import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const ConnectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB with URI:", process.env.MONGO_URI); // More descriptive log
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully!"); // Log successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default ConnectDB;