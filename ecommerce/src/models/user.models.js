import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const UserSchema=new mongoose.Schema({
name:{
type:String,
required:true,
unique:true
},
email:{
type:String,
unique:true,
required:true
},
password:{
type:String,
required:true,
select:false
},
phone:{
type:String,
required:true
},
avatar:{
type:String
},
refreshtoken:{
type:String
},
role:{
type:String,
enum:["Admin","User"],
default:"User"
}
},{timestamps:true});

UserSchema.pre("save", async function (next) {
if(!this.isModified("password")){
return next();
}
this.password=await bcrypt.hash(this.password,10);
next();
})

UserSchema.methods.matchpassword=async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword,this.password);  
}

UserSchema.methods.getaccessToken=async function () {
  return jwt.sign({id:this._id, email:this.email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY});
}
UserSchema.methods.getrefreshToken=async function () {
  return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRY});
}
const User=mongoose.model('User',UserSchema);
export default User;