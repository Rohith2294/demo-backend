
const mongoose = require('mongoose')
const subTasksSchema = new mongoose.Schema({
    subTaskName:{
        type:String
    },
    description:{
        type:String
    },
    subTaskId:{
        type:String
    },
    TaskId:{
        type:String
    },
    
    Active:{
        type:Number
    },
    Members:{
        type:Array
    },
    userId:{
        type:String
    },
    CreatedBy:{
        type:String
    },
    createdAt:{
        type:String
    },
    updatedAt:{
        type:String
    }
})
module.exports = mongoose.model('subtasks', subTasksSchema)