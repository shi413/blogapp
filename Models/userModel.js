const mongoose = require('mongoose')
const userSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:String,
    userpic:String
},{timestamps:true})

const userModel = new mongoose.model("userModel",userSchema)
module.exports = {userModel}