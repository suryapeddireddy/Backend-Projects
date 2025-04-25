import User from "../models/user.models.js";
import { UploadImage } from "../utils/cloudinary.js";
import { io } from "../utils/socket.js";
import userSocketMap from "../utils/userSocketMap.js"; // Make sure this is exported

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error.message);
    return {};
  }
};

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await user.matchpassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password incorrect" });

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshTokens(user);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // Notify socket only if user is already registered on socket
    const socketId = userSocketMap.get(user._id.toString());
    if (socketId) {
      io.to(socketId).emit("connected", "Successfully connected to the socket!");
    }

    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });

    const userId = req.user?._id?.toString();
    if (userId) {
      const socketId = userSocketMap.get(userId);
      if (socketId) {
        const socket = io.sockets.sockets.get(socketId);
        if (socket) {
          socket.disconnect(true);
          userSocketMap.delete(userId);
          console.log("Socket disconnected successfully");
        }
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const UploadAvatar = async (req, res) => {
  try {
    const localPath = req.file?.path;
    if (!localPath) return res.status(404).json({ message: "Provide profile image" });

    const username = req.user.username;
    const filePath = `chatapp/users/${username}`;
    const publicId = filePath;

    const cloudRes = await UploadImage(filePath, localPath, publicId);
    if (!cloudRes) {
      return res.status(400).json({ message: "Cloudinary upload error" });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    user.profile = cloudRes;
    await user.save();

    return res.status(200).json({
      message: "Profile uploaded",
      profile: user.profile,
    });
  } catch (error) {
    console.log("Upload error:", error);
    return res.status(500).json({ message: "Error uploading avatar" });
  }
};

export { Register, Login, Logout, UploadAvatar };
