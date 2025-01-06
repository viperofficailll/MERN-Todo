import Task from "../models/task.model.js";
export const addtask = async(req,res)=>{
    const{title ,description } = req.body;
    
   await  Task.create({title,description})
    .then((task) => res.status(201).json({success:true, message:'task added successfully'}))


}
export const delettask = async (req, res) => {
    const id = req.params.id;
    
    const present = await Task.findById(id);
    
    if (!present) {
        return res.status(404).json({ success: false, message: 'task not found' });
    }

    // Task exists, proceed to delete
    await Task.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'task deleted successfully' });
};

export const  updatetask = async(req, res)=>{
try {
    const  id = req.params.id;
    const task = await Task.findById(id);
    if(!task){
        return res.status(404).json({success:false, message:'task not found'})

    }
task.completed =!task.completed
await task.save()
res.status(200).json({ success: true, message: 'Task status updated', task });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
    
}
} 
export const alltask = async(req, res)=>{
    const tasks = await Task.find()
    res.status(200).json({success:true, tasks})
}