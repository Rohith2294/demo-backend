
const mongoose = require('mongoose')
const ContactsSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Active: Number,
    image: String,
    phoneNumber: Number,
    address: String,
    userId: String,
    CreatedBy:String,
    createdAt:String,
    updatedAt:String,
})
module.exports = mongoose.model('contacts', ContactsSchema)