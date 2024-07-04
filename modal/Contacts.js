
const mongoose = require('mongoose')
const ContactsSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    Active:{
        type:Number
    },
    image:{
        type:String
    },
    phoneNumber:{
        type:Number
    },
    address:{
        type:String
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
module.exports = mongoose.model('contacts', ContactsSchema)