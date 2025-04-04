import connectDB from './db/index.js';
import app from "./app.js";
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT;

const startserver=async()=>{
try {
 await connectDB();
 app.listen(PORT,()=>{
 console.log(`server is running on port ${PORT}`);   
 })   
} catch (error) {
 console.log("error starting server");   
}
}
startserver();