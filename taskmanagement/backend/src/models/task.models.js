import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  },
  dueDate: {
    type: Date, // When the task should be completed
  },
  reminder: {
    type: Date, // When to send the reminder email
    required:true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],//whether task is completed or not
    default: "pending",
  }
},{timestamps:true});

const Task = mongoose.model("Task", taskSchema);
export default Task;
