import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const connectDB=async()=>{
try {
await mongoose.connect(process.env.MONGODB_URI);
console.log("connected to db");   
} catch (error) {
 console.log("error connecting to db"); 
}
}
export default connectDB;