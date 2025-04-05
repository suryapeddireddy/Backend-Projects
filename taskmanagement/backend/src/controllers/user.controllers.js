import User from "../models/user.models.js";
import dotenv from "dotenv";

dotenv.config();

const getTokens = async (user) => {
  try {
    const accessToken = await user.getAccessToken();
    const refreshToken = await user.getRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    return {};
  }
};

// Register User
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in registration", error: error.message });
  }
};

// Login User
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await getTokens(user);
    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: "Error in generating tokens" });
    }

    
    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" })
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" })
      .json({ message: "Login successful",refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Error in login", error: error.message });
  }
};

// Logout User
const Logout = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: "strict" })
      .clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "strict" })
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Error in logout", error: error.message });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user || !(await user.matchPassword(oldPassword))) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in changing password", error: error.message });
  }
};

export { Register, Login, Logout, changePassword };
