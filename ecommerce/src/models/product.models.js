import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    rating: {
      type: Number,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    discount:{
    type:Number,
    default:0
    },
    brand:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Brand"
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
