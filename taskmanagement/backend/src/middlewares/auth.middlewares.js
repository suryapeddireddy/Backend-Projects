import jwt from 'jsonwebtoken';
import User from '../models/user.models';
import dotenv from 'dotenv';
dotenv.config();
const VerifyJWT=async(req,res,next)=>{
try {
const token=req.headers['authorization'].split(' ')[1]|| req.cookies.token;
if(!token)return res.status(401).json({message:"Unauthorized"});
const decoded=jwt.verify(token,process.env.JWT_SECRET);    
const user=await User.findById(decoded.id);
if(!user)return res.status(401).json({message:"Unauthorized"});
req.user=user;
next();
} catch (error) {
return res.status(401).json({message:"Unauthorized"});    
}
}

export default VerifyJWT;