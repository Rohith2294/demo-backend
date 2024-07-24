
const mongoose = require('mongoose')
const ProjectSchema = new mongoose.Schema({
    projectName:{
        type:String
    },
    description:{
        type:String
    },
    projectId:{
        type:String
    },
    Active:{
        type:Number
    },
    image:{
        type:String
    },
    Tasks:{
        type:Array
    },
    userId:{
        type:String
    },
    CreatedBy:{
        type:String
    },
    UpdatedBy:{
        type:String
    },
    createdAt:{
        type:String
    },
    updatedAt:{
        type:String
    }
})
module.exports = mongoose.model('projects', ProjectSchema)