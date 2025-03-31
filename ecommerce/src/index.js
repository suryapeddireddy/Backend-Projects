import connectDB from "./db/index.js";

try {
await connectDB();  
console.log(`successfully connected to db`);
} catch (error) {
console.log(error);  
}



