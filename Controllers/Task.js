
const Project = require('../modal/Projects')
const Task = require('../modal/Tasks')
const User = require('../modal/User')

exports.createTask = async (req, res) => {
    try {
        // Destructure fields from req.body
        let { TaskName, description, image, userId, projectId } = req.body;
        
        // Convert arrays to strings if needed
        if (Array.isArray(TaskName)) {
            TaskName = TaskName[0]; // Take the first element assuming it's the intended string value
        }
        if (Array.isArray(description)) {
            description = description[0]; // Take the first element assuming it's the intended string value
        }
        
        const now = new Date();

        // Log request body for debugging
        console.log("Request body:", req.body);

        // Validate required fields
        if (!TaskName || !description || !userId || !projectId) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findProject = await Project.findOne({ _id: projectId, Active: 1 });
        const findTaskName = await Task.findOne({ TaskName: TaskName, Active: 1 });

        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        if (findTaskName) {
            return res.status(400).json({ error: "TaskName already exists. Please try a different TaskName." });
        }

        // Create a new task
        const createdTask = new Task({
            TaskName,
            description,
            image,
            subTasks: [],
            Active: 1,
            CreatedBy: findUser._id,
            projectId: findProject._id,
            createdAt: now,
            updatedAt: now,
        });

        // Save the created task
        await createdTask.save();

        return res.status(201).json({
            message: "Task created successfully",
            Task: createdTask,
        });
    } catch (error) {
        console.error("Error Creating Task:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message, stack: error.stack });
    }
};

exports.editTask = async (req, res) => {
    try {
        const { TaskName, description, image, userId, TaskId } = req.body;
        const now = new Date();

        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findTask = await Task.findOne({ _id: TaskId, Active: 1, CreatedBy: userId });

        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        const updatedData = await Task.findOneAndUpdate({ _id: findTask._id, Active: 1 },
            {
                TaskName,
                description,
                image,
                UpdatedBy: findUser._id,
                updatedAt: now,
            }, { new: true })
        // Save the Updated task first
        return res.status(201).json({
            message: "Task Updated successfully",
            Task: updatedData,
        });
    } catch (error) {
        console.error("Error Creating Task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getTasks = async (req, res) => {
    try {
        const { userId ,projectId} = req.body;
        console.log(userId ,projectId,'req.body;')
        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findProject = await Project.findOne({ _id: projectId, Active: 1 });
        console.log(findProject,'findProject')
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        const getTasks = await Task.find({ Active: 1, CreatedBy: userId ,projectId:findProject._id})
        if (!getTasks) {
            return res.status(201).json({ message: "Tasks Not Found", });
        } else {
            // Save the Updated task first
            return res.status(201).json({
                message: "Get Tasks",
                Tasks: getTasks,
            });
        }

    } catch (error) {
        console.error("Error getting Tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteTask = async (req, res) => {
    const { TaskId,userId } = req.body;
    // Validate input data
    const findUser = await User.findOne({ _id: userId, Active: 1 });

    if (!findUser) {
        return res.status(404).json({ error: "User not found" });
    }


    try {
        const updatedContact = await Task.findById({_id:TaskId});
        if (updatedContact)
            if (!updatedContact) {
                return res.status(404).json({ error: 'Task not found' });
            } else {
                if (updatedContact) {
                    const TaskDetails = await Contact.findByIdAndUpdate({ _id: TaskId, Active: 1 },
                        { Active: 0 },
                        { new: true })
                    res.status(200).json({ message: 'Task Deleted successfully', TaskDetails });
                }
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};