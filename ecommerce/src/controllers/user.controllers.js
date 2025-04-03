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
    if (!secureurl)
      return res.status(400).json({ menubar: "secureurl is empty" });
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
      .json({ message: "error in registering user", error: error.message });
  }
};
const getAccessandRefreshtokens = async (userexists) => {
  try {
    const accesstoken = await userexists.getaccessToken();
    const refreshtoken = await userexists.getrefreshToken();
    return { accesstoken, refreshtoken };
  } catch (error) {
    console.log(error);
    return {};
  }
};
const LoginUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    let query = {};
    query.$or = [{ name }, { email }, { phone }];
    const userexists = await User.findOne(query).select("+password");
    if (!userexists)
      return res.status(404).json({ message: "user doesn't exist" });
    const ispasswordValid = await userexists.matchpassword(password);
    if (!ispasswordValid)
      return res.status(401).json({ message: "invalid credentials" });
    const { accesstoken, refreshtoken } = await getAccessandRefreshtokens(
      userexists
    );
    userexists.refreshtoken = refreshtoken;
    await userexists.save();
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accesstoken, options)
      .cookie("refreshToken", refreshtoken, options)
      .json({
        message: "User loggedin successfully",
        user: {
          _id: userexists._id,
          name: userexists.name,
          email: userexists.email,
          phone: userexists.phone,
          avatar: userexists.avatar,
        },
      });
  } catch (error) {
    return res.status(500).json({ message: "error in logging in" });
  }
};

const LogoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.refreshtoken = "";
    await user.save();
    const options = { httpOnly: true, secure: true };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error logging out", error: error.message });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user got successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "error getting user" });
  }
};

const getallUsers = async (req, res) => {
  try {
    const { limit, page, sort, keyword } = req.query;
    let query = {};
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, options: "i" } },
        { email: { $regex: keyword, options: "i" } },
      ];
    }
    let sortoption = {};
    if (sort) {
      sortoption[sort] = 1;
    }
    console.log(sortoption);
    const skip = (Number(page) - 1) * Number(limit);
    const users = await User.find(query)
      .sort(sortoption)
      .skip(skip)
      .limit(limit)
      .select("_id name email");
    return res
      .status(200)
      .json({ message: "fetched users successfully", users });
  } catch (error) {
    return res.status(500).json({ message: "error getting all users" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId).select("+password");
    const ispasswordcorrect = await user.matchpassword(oldpassword);
    if (!ispasswordcorrect) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    user.password = newpassword;
    await user.save();
    return res.status(200).json({ message: "user password changed" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error changing password", error: error.message });
  }
};

const updateavatar = async (req, res) => {
  try {
    const name = req.user.name;
    const filepath = req.files.avatar[0].path;
    if (!filepath)
      return res.status(401).json({ message: "filepath is required" });
    const folderpath = `ecommerce/users/${name}`;
    await destroyImages(folderpath);
    const secureurl = await UploadImagetoCloudinary(
      filepath,
      `${name}`,
      folderpath
    );
    const user = await User.findById(req.user._id);
    user.avatar = secureurl;
    await user.save();
    return res.status(200).json({ message: "avatar updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error updating cover image" });
  }
};

const updateaccount = async (req, res) => {
  try {
    const { name, email, phone, address, pincode } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.pincode = pincode;
    await user.save();
    return res.status(200).json({ message: "updated account successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error in updating successfully" });
  }
};
export {
  RegisterUser,
  LoginUser,
  LogoutUser,
  getUserbyId,
  getallUsers,
  changePassword,
  updateavatar,
  updateaccount,
};
