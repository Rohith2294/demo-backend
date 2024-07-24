
const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    TaskName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    subTasks: { type: Array, default: [] },
    Active: { type: Number, default: 1 },
    CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('tasks', TaskSchema)