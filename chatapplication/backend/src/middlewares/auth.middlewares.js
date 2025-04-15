import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
const VerifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user=await User.findById(decoded.id);
    req.user=user;
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, token invalid" });
  }
};

export default VerifyJWT;
