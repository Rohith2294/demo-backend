
const mongoose = require("mongoose");
const { Schema } = mongoose;
const MainUsersSchema = new Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String},
    phonenumber: {type:Number},
    gender: {type:String},
    CreateTime:{type:String},
    Active:{type:Number},
    otp:{type:String},
    newPassword:{type:String},
    ConfirmPassword:{type:String},
    contacts:{type:Array}
},
{ timestamps: true })
module.exports= mongoose.model('Users', MainUsersSchema)
