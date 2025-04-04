import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true,
    },
    subcategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required:true,
    },
    rating: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
