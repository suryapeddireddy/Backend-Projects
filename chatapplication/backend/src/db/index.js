import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const ConnectDB=async()=>{
try {
await mongoose.connect(process.env.MONGO_URI);    
console.log("connected to db");
} catch (error) {
console.log(error);    
}
}

export default ConnectDB;