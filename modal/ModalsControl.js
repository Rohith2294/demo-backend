
const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    Active: Number,
})
module.exports=mongoose.model('Users',userSchema)