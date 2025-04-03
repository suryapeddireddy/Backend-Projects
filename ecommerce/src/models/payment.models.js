import mongoose from "mongoose";

const PaymentSchema=new mongoose.Schema({
order:{
type:mongoose.Schema.Types.ObjectId,
ref:'Order',
required:true
},
amountPaid:{
type:Number,
default:0
},
PaymentStatus:{
type:String,
default:'Unpaid',
enum:['Unpaid','Paid']
}
})

const Payment=mongoose.model('Payment',PaymentSchema);

export default Payment