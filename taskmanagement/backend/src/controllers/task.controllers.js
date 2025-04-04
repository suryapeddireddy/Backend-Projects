import Task from '../models/task.models.js';
import User from '../models/user.models.js';


const CreateTask=async(req,res)=>{
try {
 const {title, description, reminder,dueDate} = req.body;
 if(!title || !description || !reminder){
 return res.status(400).json({message:"Please provide all the required fields"});
 }
 const userId=await req.user._id;
 const finalDueDate = dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
const task=new Task({
    title,
    description,
    dueDate:finalDueDate,
    reminder,
    createdBy:userId
});
 await task.save();
 return res.status(201).json({message:"Task created Successfully",task});
} catch (error) {
return res.status(500).json({message:"Error in Creating Task"}); 
}
}

const DeleteTask=async(req,res)=>{
try {
const {taskId}=req.params;
const task=await Task.findById(taskId);
if(!task){
return res.status(404).json({message:"task not found"});
}
if(task.createdBy.toString()!==req.user._id.toString()){
return res.status(401).json({message:"You are not authorized to delete this task"});
}
await Task.findByIdAndDelete(taskId);
return res.status(200).json({message:"Task deleted successfully"});  
} catch (error) {
return res.status(500).json({message:"Error in deleting task"});
}
}

const UpdateTask=async(req,res)=>{
try {
const {taskId}=req.params;
const { title, description, dueDate, reminder} = req.body;
const task=await Task.findById(taskId);
if(!task){
return res.status(404).json({message:"task not found"});
}
if(task.createdBy.toString()!==req.user._id.toString()){
return res.status(401).json({message:"You are not authorized to delete this task"});
}
if(title)task.title=title;
if(description)task.description=description;
if(dueDate)task.dueDate=dueDate;
if(reminder)task.reminder=reminder;
await task.save();
return res.status(200).json({message:"Task updated successfully",task});
} catch (error) {
return res.status(500).json({message:"Error in updating task"});
}
}

const GetTaskById=async(req,res)=>{
try {
 const {taskId}=req.params;
 const task=await Task.findById(taskId);
 if(!task){
    return res.status(404).json({message:"Task not found"});
 } 
 if(task.createdBy.toString()!==req.user._id.toString()){
    return res.status(401).json({message:"You are not authorized to delete this task"});
    }  
 return res.status(200).json({message:"Task fetched successfully",task});
} catch (error) {
    return res.status(500).json({message:"Error in getting task"});    
}
}

const GetallTasks=async(req,res)=>{

}

const ToggleTask=async(req,res)=>{

}

const GetpendingTasks=async(req,res)=>{
}

const GetcompletedTasks=async(req,res)=>{
}

export {CreateTask,DeleteTask,UpdateTask,GetTaskById,GetallTasks,ToggleTask,GetpendingTasks,GetcompletedTasks};


