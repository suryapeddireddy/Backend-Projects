import mongoose from "mongoose";

const ReviewSchema=new mongoose.Schema({
owner:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
},
Comment:{
type:String,
required:true
},
rating:{
type:Number,
required:true
}
})

const Review=mongoose.model('Review',ReviewSchema);
export default mongoose