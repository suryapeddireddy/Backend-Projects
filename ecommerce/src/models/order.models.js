import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        min: [1, "quantity must be atleast one"],
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippingaddress: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
  shipmentstatus: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    default: "pending",
  },
},{timestamps:true});

const Order=mongoose.model('Order',OrderSchema);
export default Order
