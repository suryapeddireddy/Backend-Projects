import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import { UploadImage } from "../utils/cloudinary.js";
import { io, userSocketMap } from "../utils/socket.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json({filteredUsers});
  } catch (error) {
    res.status(500).json({ message: "Failed to get users", error: error.message });
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

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Failed to get messages", error: error.message });
  }
};

const SendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiver } = req.params;
    let images = [];

    if (req.files && req.files["image"]) {
      for (let file of req.files["image"]) {
        let imageUrl = await UploadImage(file.path, `/chat/messages/${req.user.username}`);
        images.push(imageUrl);
      }
    }

    const newMessage = new Message({
      sender: req.user._id,
      receiver,
      images,
      text,
    });

    await newMessage.save();

    // Send real-time message if receiver is online
    const receiverSocketId = userSocketMap.get(receiver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", newMessage);
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message", error: error.message });
  }
};

export { getUsersForSidebar, GetMessages, SendMessages };
