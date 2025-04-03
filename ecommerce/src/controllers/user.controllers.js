import User from "../models/user.models.js";
import { UploadImagetoCloudinary, destroyImages } from "../utils/cloudinary.js";
const RegisterUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      address = "",
      pincode = "",
    } = req.body;
    if (!name || !email || !password || !phone)
      return res.status(400).json({ message: "All fields are required" });
    const userexists = await User.findOne({ email });
    if (userexists)
      return res.status(400).json({ message: "user already exists" });
    const filepath = req.files?.avatar?.[0].path;
    const folderpath = `ecommerce/users/${name}`;
    if (!filepath)
      return res.status(403).json({ message: "filepath is required" });
    const secureurl = await UploadImagetoCloudinary(
      filepath,
      `${name}`,
      folderpath
    );
    if (!secureurl) return res.status(400).json({ menubar: "secureurl is empty" });
    const newuser = new User({
      name,
      email,
      password,
      phone,
      address,
      pincode,
      avatar: secureurl,
    });
    await newuser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({message:"error in registering user", error:error.message});
  }
};

const LoginUser = async (req, res) => {

};

const LogoutUser = async (req, res) => {};

const getUserbyId = async (req, res) => {};

const getallUsers = async (req, res) => {};

const changePassword = async (req, res) => {};

const updatecoverImage = async (req, res) => {};

const updateaccount = async (req, res) => {};
export {
  RegisterUser,
  LoginUser,
  LogoutUser,
  getUserbyId,
  getallUsers,
  changePassword,
  updatecoverImage,
  updateaccount,
};
