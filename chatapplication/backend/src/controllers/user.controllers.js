import User from "../models/user.models.js";
import UploadImage from "../middlewares/multer.middlewares.js";

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken;
    const refreshToken = await user.generateRefreshToken;
    return { accessToken, refreshToken };
  } catch (error) {
    return {};
  }
};

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Provide all fields" });

    const profilepath = req.file?.path;
    if (!profilepath)
      return res.status(400).json({ message: "Profile image is required" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(403).json({ message: "User already exists" });

    const cloudinaryUrl = await UploadImage(
      `/chat/users/${username}`,
      profilepath
    );

    if (!cloudinaryUrl) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" });
    }

    const newUser = new User({
      username,
      email,
      password,
      profile: cloudinaryUrl,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: "Error in registering User", error:error.message});
  }
};

const Login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email)
      return res.status(400).json({ message: "Provide username or email" });
    if (!password) return res.status(400).json({ message: "Provide password" });

    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password incorrect" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "Login failed",error:error.message});
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ message: "Server error during logout" });
  }
};

export { Register, Login, Logout };
