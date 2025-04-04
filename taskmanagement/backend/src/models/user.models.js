import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
export default User;
