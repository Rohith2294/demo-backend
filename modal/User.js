const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    gender:{
        type:String
    },
    CreateTime:{
        type:String
    },
    Active:{
        type:Number
    },
    otp:{
        type:String
    },
    newPassword:{
        type:String
    },
    ConfirmPassword:{
        type:String
    },
    contacts:{
        type:Array
    },

    Projects:{
        type:Array
    },
    contacts:{
        type:Array
    },
    contactId:{
        type:String
    }
})


module.exports= mongoose.model('User', UserSchema)
