import mongoose from "mongoose";

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
address:{
type:String,
},
pincode:{
type:String
}
})

const User=mongoose.model('User',UserSchema);
export default User;