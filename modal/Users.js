
const mongoose=require('mongoose')
const MainUsersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
    gender: String,
    CreateTime:String,
    Active: Number,
    otp:String,
    newPassword:String,
    ConfirmPassword:String,
    contacts:Array
})
module.exports= mongoose.model('Users', MainUsersSchema)
