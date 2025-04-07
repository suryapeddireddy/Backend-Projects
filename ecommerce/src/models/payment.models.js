import mongoose from "mongoose";

const PaymentSchema=new mongoose.Schema({
order:{
type:mongoose.Schema.Types.ObjectId,
ref:'Order',
required:true
},
PaymentStatus:{
type:String,
default:'Unpaid',
enum:['Unpaid','Paid']
},
paymentIntentId:{
type:String,
required:true
},
})

const Payment=mongoose.model('Payment',PaymentSchema);

export default Payment