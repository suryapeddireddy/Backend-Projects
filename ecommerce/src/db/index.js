import mongoose from "mongoose";
import app from '../app.js';
import dotenv from 'dotenv'
dotenv.config();
const mongodb_uri=process.env.MONGODB_URI
const port=process.env.PORT
const connectDB=async()=>{
try {
 await mongoose.connect(mongodb_uri);
 app.listen(port,()=>{
 console.log(`listening on port ${port}`);
 })
} catch (error) {
console.log("Error connecting db")  
}
}
export default connectDB
