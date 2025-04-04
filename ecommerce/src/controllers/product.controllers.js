import Product from '../models/product.models.js'
import Category from '../models/category.models.js'
import {UploadImagetoCloudinary,destroyImages} from '../utils/cloudinary.js'
const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      minprice = 0,
      maxprice = 100000000000000,
      stock,
      cateogry,
      subcategory,
      rating,
      sort,
      page = 1,
      limit = 10,
      discount = 0,
    } = req.query;
    let query = {};
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];

    query.price = {};
    query.price.$gte = Number(minprice);
    query.price.$lte = Number(maxprice);
    if (stock) query.stock({ $gt: 0 });
    if (discount) query.discount({ $gt: 0 });
    if(cateogry){
    query.category=cateogry;
    }
    if(subcategory)query.subcategory=subcategory;
    if(rating)query.rating = rating;
    let sortoption = {};
    if(sort)sortoption[sort] = 1;
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .sort(sortoption)
      .skip(skip)
      .limit(Number(limit))
      .select("_id title description");
    const totalproducts = await Product.countDocuments(query);
    return res.status(200).json({
      products,
      totalproducts,
      currentPage: Number(page),
      totalpages: Math.ceil(totalproducts / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: "error in getting products" });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ message: "error in getting productbyId" });
  }
};

const addProduct=async(req,res)=>{
try {
const {title, description, price, stock, discount, category,subcategory=null}=req.body;
if(req.user.role!=="Admin"){
return res.status(403).json({message:"Access denied, Admins only"});
}
if(!title || !description || !price || !stock)return res.status(400).json({message:"All fields are required"});
const productexist=await Product.findOne({title});
if(productexist){
return res.status(400).json({message:"Product already exists"});
}
let imageurls=[];
const folderpath=`ecommerce/products/${title}`;
let count=1;
for(const file of req.files.images){
const uploadresult=await UploadImagetoCloudinary(file.path, `${title}/${count}`,folderpath);
imageurls.push(uploadresult);
count++;
}
if(imageurls.length==0){
return res.status(400).json({message:"images are required"});
}
let reqcategory;
if(category){
  const categoryexist=await Category.findOne({name:subcategory, parentcategory:category});
  if(!categoryexist)await Category.create({name:subcategory,parentcategory:category});
  reqcategory=await Category.findOne({name:subcategory, parentcategory:category});
  }
const convertedPrice = Number(price);
const convertedStock = Number(stock);
const convertedDiscount = Number(discount);
const newproduct=new Product({
title,
description,
price:convertedPrice,
stock:convertedStock,
discount:convertedDiscount,
images:imageurls,
category:reqcategory._id,
});
await  newproduct.save();
return res.status(201).json({message:"Product added successfully"});
} catch (error) {
    return res.status(500).json({message:"error in adding product",error:error.message});
}
}

const deleteProduct=async(req,res)=>{
try {
if(req.user.role!=="Admin"){
return res.status(403).json({message:"Admins Only, U are not allowed to delete product"});
}
const {productId}=req.params;
const product=await Product.findById(productId);
if(!product){
return res.status(404).json({message:"product not found"});
}    
await Product.findByIdAndDelete(productId);
return res.status(200).json({message:"Product deleted successfully"});
} catch (error) {
return res.status(500).json({message:"Error in deleting product"});  
}
}

const updateProduct=async(req,res)=>{
try {
if(req.user.role!=="Admin")return res.status(403).json({message:"Only Admins allowed to upadate product"});
const {title, description, category,subcategory,price, discount}=req.params;
const {productId}=req.params;
const product=await Product.findById(productId);
if(!product){
return res.status(404).json({message:"Product not found"});
}
await destroyImages(folderpath);
let imageurls=[];
const folderpath=`ecommerce/products/${title}`;
for(const file of req.files.images){
const secureurl=await UploadImagetoCloudinary(file.path, `${title}`, folderpath);
imageurls.push(secureurl);
}
if(title)product.title=title;
if(description)product.description=description;
if(Category)product.category=category;
if(subcategory)product.subcategory=subcategory;
if(price)product.price=price;
if(discount)product.discount=discount;
if(imageurls)product.images=imageurls;
await product.save();
return res.status(200).json({message:"Product update successfully"});
} catch (error) {
return res.status(500).json({message:"failed to update product"});    
}
}
export  { getProducts , getProductbyId, addProduct, deleteProduct, updateProduct};
