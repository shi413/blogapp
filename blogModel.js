const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    name:String,
    image:String,
})
const blogModel = mongoose.model("users",blogSchema)
module.exports = {blogModel}