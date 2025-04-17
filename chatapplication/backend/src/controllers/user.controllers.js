import User from "../models/user.models.js";
import UploadImage from '../utils/cloudinary.js'

const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    return { accessToken, refreshToken };
  } catch (error) {
    return {};
  }
};

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(403).json({ message: "User already exists" });

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({error:error.message});
  }
};

const Login = async (req, res) => {
  try {
    const {email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await user.matchpassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Password incorrect" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
     console.log(accessToken,refreshToken);
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
    return res.status(500).json({error:error.message});
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
      secure: true
    });

    return res.status(200).json({success:true});
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ error: error.message});
  }
};

export { Register, Login, Logout };
