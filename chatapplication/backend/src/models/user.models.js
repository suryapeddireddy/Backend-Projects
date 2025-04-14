import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config();
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profile: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.matchpassword=async function(password){
return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } 
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" } 
  );
};

const User = mongoose.model("User", UserSchema);

export default User;
