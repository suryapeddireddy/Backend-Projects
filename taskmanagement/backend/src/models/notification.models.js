import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task", 
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "sent"],
    default: "pending", // whether notification is sent or not
  },
},{timestamps:true});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
