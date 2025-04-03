import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
required:true
},
phone:{
type:String,
required:true
},
avatar:{
type:String
},
address:{
type:String,
required:true
},
pincode:{
type:String
}
})

UserSchema.pre("save", async function (next) {
if(!this.isModified("password")){
return next();
}
this.password=await bcrypt.hash(this.password,10);
next();
})

UserSchema.methods.matchpassword=async function (enteredpassword) {
  return await bcrypt.compare(this.password, enteredpassword);  
}
const User=mongoose.model('User',UserSchema);
export default User;