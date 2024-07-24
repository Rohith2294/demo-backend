const { response } = require('express');
const Project = require('../modal/Projects')
const User = require('../modal/User')
var jwt = require('jsonwebtoken')
const Task = require('../modal/Tasks')
const subTask = require('../modal/subTasks')

exports.createSubTask = async (req, res) => {
    try {
        const { subTaskName, description, image, userId, taskId } = req.body;
        const now = new Date();
        const findUser = await User.findOne({ _id: userId, Active: 1 })
        const findTask = await Task.findOne({ _id: taskId, Active: 1 })
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Create a new contact
        const createdSubTask = new subTask({
            subTaskName,
            description,
            image,
            Active: 1,
            CreatedBy: findUser._id,
            TaskId: findTask._id,
            createdAt: now,
            updatedAt: now,
        });
        if (findUser) {
            if (createdSubTask) {
                findTask.subTasks.push(createdSubTask._id)
            } else {
                return res.status(404).json({ error: "Projects Not Updated In User" })
            }
            await findTask.save()
            await createdSubTask.save()
            return res.status(201).json({
                message: "subTask created successfully",
                Project: createdSubTask,
            });
        }
    } catch (error) {
        console.error("Error Creating Project:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.editsubTask = async (req, res) => {
    try {
        const { subTaskName, description, image, userId, subTaskId } = req.body;
        const now = new Date();
        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findsubTask = await subTask.findOne({ _id: subTaskId, Active: 1, CreatedBy: userId });

        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findsubTask) {
            return res.status(404).json({ error: "subTask not found" });
        }

        const updatedData = await subTask.findOneAndUpdate({ _id: findsubTask._id, Active: 1 },
            {
                subTaskName,
                description,
                image,
                UpdatedBy: findUser._id,
                updatedAt: now,
            }, { new: true })
        // Save the Updated task first
        return res.status(201).json({
            message: "subTask Updated successfully",
            Task: updatedData,
        });
    } catch (error) {
        console.error("Error updating Task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getsubTasks = async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        console.log(userId, taskId, 'req.body;')
        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findTask = await Task.findOne({ _id: taskId, Active: 1 });
        console.log(findTask, 'findTask')
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        const getsubTasks = await Task.find({ Active: 1, CreatedBy: userId, _id: findTask._id })
        if (!getsubTasks) {
            return res.status(201).json({ message: "subTasks Not Found", });
        } else {
            // Save the Updated task first
            return res.status(201).json({
                message: "Get subTasks",
                Tasks: getsubTasks,
            });
        }
    } catch (error) {
        console.error("Error getting Tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteTask = async (req, res) => {
    const { subTaskId, userId } = req.body;
    // Validate input data
    const findUser = await User.findOne({ _id: userId, Active: 1 });
    if (!findUser) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        const updatedsubTask = await subTask.findById({ _id: subTaskId });
        if (updatedsubTask)
            if (!updatedsubTask) {
                return res.status(404).json({ error: 'Task not found' });
            } else {
                if (updatedsubTask) {
                    const subTaskDetails = await subTask.findByIdAndUpdate({ _id: subTaskId, Active: 1 },
                        { Active: 0 },
                        { new: true })
                    res.status(200).json({ message: 'subTask Deleted successfully', subTaskDetails });
                }
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};