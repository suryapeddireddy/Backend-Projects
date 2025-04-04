import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  dueDate: {
    type: Date, 
  },
  reminder: {
    type: Date, 
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  isReminderSent: {
    type: Boolean,
    default: false, 
  }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
