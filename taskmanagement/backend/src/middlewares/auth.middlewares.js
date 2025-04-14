import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

const VerifyJWT = async (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1] || req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default VerifyJWT;
