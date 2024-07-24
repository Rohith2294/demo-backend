const { response } = require('express');
const Project = require('../modal/Projects')
const User = require('../modal/User')
var jwt = require('jsonwebtoken')
const Task = require('../modal/Tasks')

exports.createProject = async (req, res) => {
    try {
        const { projectName, description, image, userId } = req.body;
        const now = new Date();
        const findUser = await User.findOne({ _id: userId, Active: 1 })
        const findName = await Project.findOne({ name: projectName, Active: 1 })
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (findName) {
            return res.status(404).json({ error: "projectName Is Already Exists! Try Again Different Name" });
        }
        // Create a new contact
        const createdProject = new Project({
            projectName,
            description,
            image,
            Tasks: [],
            Active: 1,
            CreatedBy: findUser._id,
            createdAt: now,
            updatedAt: now,
        });
        if (findUser) {
            const UpdateUser = await User.findOne({ _id: findUser._id })
            if (UpdateUser) {
                UpdateUser.Projects.push(createdProject._id)
            } else {
                return res.status(404).json({ error: "Projects Not Updated In User" })
            }
            await UpdateUser.save()
            await createdProject.save()
            return res.status(201).json({
                message: "Project created successfully",
                Project: createdProject,
                UpdateUser: UpdateUser
            });
        }
    } catch (error) {
        console.error("Error Creating Project:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.editProject = async (req, res) => {
    try {
        const { projectName, description, image, userId, projectId } = req.body;
        const now = new Date();

        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        const findProject = await Project.findOne({ _id: projectId, Active: 1, CreatedBy: userId });
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!findProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        const updatedData = await Project.findOneAndUpdate({ _id: findProject._id, Active: 1 },
            {
                projectName,
                description,
                image,
                UpdatedBy: findUser._id,
                updatedAt: now,
                Active: 1 
            }, { new: true })
        // Save the Updated Project first
        return res.status(201).json({
            message: "Project Updated successfully",
            Project: updatedData,
        });
    } catch (error) {
        console.error("Error Updating Project:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getProjects = async (req, res) => {
    try {
        const { userId } = req.body;
        // Find user and project
        const findUser = await User.findOne({ _id: userId, Active: 1 });
        if (!findUser) {
            return res.status(404).json({ error: "User not found" });
        }
        const getProjects = await Project.find({ Active: 1, CreatedBy: userId })
        if (!getProjects) {
            return res.status(201).json({ message: "Projects Not Found", });
        } else {
            // Save the Updated Project first
            return res.status(201).json({
                message: "Get Projects",
                Projects: getProjects,
            });
        }

    } catch (error) {
        console.error("Error getting Tasks:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteProject = async (req, res) => {
    const { projectId, userId } = req.body;
    // Validate input data
    const findUser = await User.findOne({ _id: userId, Active: 1 });
    const findProject = await Project.findOne({ _id: projectId, Active: 1, CreatedBy: userId });
    console.log(findProject, 'findProject')
    if (!findUser) {
        return res.status(404).json({ error: "User not found" });
    }
    if (!findProject) {
        return res.status(404).json({ error: "Project not found" });
    }
    try {
        if (findProject) {
            const ProjectDetails = await Project.findByIdAndUpdate({ _id: projectId, Active: 1 },
                { Active: 0 },
                { new: true })
            await Task.findOneAndUpdate({ projectId: projectId, Active: 1 },
                { Active: 0 },
                { new: true })
            res.status(200).json({ message: 'Project Deleted successfully', ProjectDetails });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};