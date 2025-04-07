import mongoose from "mongoose";

const AddressSchema=new mongoose.Schema({
owner:{
type:mongoose.Schema.Types.ObjectId,
required:true
},
address:{
type:String,
required:true
},
pincode:{
type:String,
required:true
},
phone:{
type:String,
required:true
}
})

const Address=mongoose.model('Address',AddressSchema);
export default Address;