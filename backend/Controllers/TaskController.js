const TaskModel = require('../Models/TaskModel');

const createTask = async (req,res) =>{
    const data = req.body;
    try{
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({message: "Task is Created", success: true});
    }catch(err){
        res.status(500).json({message: "Failed To Create Task", success: false});
    }
}

const FetchAlltask = async (req,res) =>{
    try{
        const data = await TaskModel.find({});
        res.status(200).json({message: "All Tasks", success: true, data});
    }catch(err){
        res.status(500).json({message: "Failed To Fetch Task", success: false});
    }
}

const UpdateTasksById = async (req,res) =>{
    try{
        const id = req.params.id;
        const body = req.body;
        const obj = {$set: {...body}};
        await TaskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({message: " Tasks Update", success: true});
    }catch(err){
        res.status(500).json({message: "Failed To Update Task", success: false});
    }
}

const DeleteTasksById = async (req,res) =>{
    try{
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
        res.status(201).json({message: "Tasks Deleted", success: true});
    }catch(err){
        res.status(500).json({message: "Failed To Delete Task", success: false});
    }
}

module.exports = { createTask, FetchAlltask , UpdateTasksById , DeleteTasksById }