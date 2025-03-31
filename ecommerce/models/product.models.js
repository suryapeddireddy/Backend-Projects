import mongoose from "mongoose";
import Category from "./category.models";

const ProductSchema=new mongoose.Schema({
title:{
type:String,
required:true
},
description:{
type:String,
required:true
},
price:{
type:Number,
required:true
},
stock:{
type:Number,
required:true
},
images:{
type:[string],
required:true
},
Category:{
type:mongoose.Schema.Types.ObjectId,
ref:'Category',
required:true
},
SubCategory:{
type:mongoose.Schema.Types.ObjectId,
ref:'Category',
required:true
},
rating:{
type:Number,
}
},{timestamps:true});

const Product=mongoose.model('Product',ProductSchema);
export default Product;