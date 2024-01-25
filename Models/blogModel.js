const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    blogId:Number,
    title:String,
    description:String,
    category:String,
    blogpic:String,
})
const blogModel = mongoose.model("blogModel",blogSchema)
module.exports = {blogModel}