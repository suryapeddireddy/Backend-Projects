import jwt from 'jsonwebtoken'
import User from "../models/user.models.js";
import dotenv from 'dotenv'
dotenv.config();
const verifyJWT=async(req,res,next)=>{
try {
const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]; 
if(!token){
return res.status(401).json({message:"invalid tokens"});
}
const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
if(!decoded){
return res.status(403).json({message:"access denied"});
}
const user=await User.findById(decoded.id);
req.user=user;
next();
} catch (error) {
return res.status({message:"error in verifyingJWTs"});  
}
}

export default verifyJWT;