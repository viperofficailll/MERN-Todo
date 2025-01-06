import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({

  title: 
  { type: String,
     required: true },
  description: 
  { type: String,
     required: true },

  completed: { type: Boolean, default: false },

  owner: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
} ,{timestamps :true});
const Task = mongoose.model("Task", taskSchema);

export default Task;