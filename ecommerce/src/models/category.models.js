import mongoose from "mongoose";

const CategorySchema=new mongoose.Schema({
name:{
type:String,
required:true
},
parentcategory:{
type:mongoose.Schema.Types.ObjectId,
ref:"category",
default: null // means if it is already parent
}
},{timestamps:true})

const Category=mongoose.model('Category',CategorySchema);
export default Category