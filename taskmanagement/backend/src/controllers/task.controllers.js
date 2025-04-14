import Task from "../models/task.models.js";

const CreateTask = async (req, res) => {
  try {
    const { title, description, reminder, dueDate } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }
    const userId = req.user._id;
    const task = new Task({ title, description, dueDate, reminder, createdBy: userId });
    await task.save();
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Error in creating task",error:error.message});
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to delete this task" });
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in deleting task" });
  }
};

const UpdateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, reminder } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to update this task" });
    }
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (reminder) task.reminder = reminder;
    await task.save();
    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Error in updating task" });
  }
};

const GetTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to view this task" });
    }
    return res.status(200).json({ message: "Task fetched successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Error in getting task" });
  }
};

const GetAllTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ createdBy: userId });
    if (!tasks.length) return res.status(404).json({ message: "No tasks found" });
    return res.status(200).json({ message: "Tasks fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error in getting tasks" });
  }
};

const ToggleTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not authorized to update this task" });
    }
    task.status = task.status === "pending" ? "completed" : "pending";
    await task.save();
    return res.status(200).json({ message: "Task status toggled successfully", task });
  } catch (error) {
    return res.status(500).json({ message: "Error in toggling task" });
  }
};

const GetPendingTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ createdBy: userId, status: "pending" });
    return res.status(200).json({ message: "Pending tasks fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error in getting pending tasks" });
  }
};

const GetCompletedTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ createdBy: userId, status: "completed" });
    return res.status(200).json({ message: "Completed tasks fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error in getting completed tasks" });
  }
};

const GetReminderTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentTime = new Date();
    const tasks = await Task.find({ createdBy: userId, reminder: { $gte: currentTime } });
    return res.status(200).json({ message: "Reminder tasks fetched successfully", tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error in getting reminder tasks" });
  }
};

export {CreateTask,DeleteTask,UpdateTask,GetTaskById,GetAllTasks,ToggleTask,GetPendingTasks,GetCompletedTasks,GetReminderTasks}
