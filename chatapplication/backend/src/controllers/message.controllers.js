import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import {UploadImage, deleteImage} from "../utils/cloudinary.js";
const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to get Users", error: error.message });
  }
};

const GetMessages = async (req, res) => {
  try {
    const { id: receiver } = req.params;
    const sender = req.user._id;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });
    res
      .status(200)
      .json({ message: "fetched all messages successfully", messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to get Users", error: error.message });
  }
};

const SendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiver } = req.params;
    let images = [];
    for (let file of req.files["image"]) {
      let imageurl = await UploadImage(
        file.path,
        `/chat/messages/${req.user.username}`
      );
      images.push(imageurl);
    }
    const newMessage = new Message({
      sender: req.user._id,
      receiver,
      images,
    });
    await newMessage.save();
    return res.status(201).json({ message: "Posted message", newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to get Users", error: error.message });
  }
};
export { getUsersForSidebar, GetMessages, SendMessages };
