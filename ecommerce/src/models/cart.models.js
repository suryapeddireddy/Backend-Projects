import mongoose from "mongoose";

const CartSchema=new mongoose.Schema({
owner:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
},
Products:[
{
Product:{
type:mongoose.Schema.Types.ObjectId,
ref:'Product' 
},
quantity:{
type:Number,
min:[1,'atleast 1 is required']
}
}
],
totalprice:{
type:Number,
required:true
}
},{timestamps:true})

const Cart=mongoose.model('Cart',CartSchema);
export default Cart