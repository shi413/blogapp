const express = require('express')
const { blogModel } = require('./Models/blogModel')
const app = express()
const cors = require('cors')
app.use(express.static("public"))
const multer = require('multer')
app.use(express.json())
app.use(cors())
require('./Dbconnection/mongoose')

//multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage}).single("blogpic")


//create blog

app.post("/CreateBlog",async(req,res)=>{

    upload(req,res, async(err)=>{
            const blog = new blogModel({
                blogId:req.body.blogId,
                title:req.body.title,
                description:req.body.description,
                category:req.body.category,
                blogpic:"localhost:4000/uploads/"+req.file.filename
            })
            await blog.save()
            res.send({success:true,message:"Blog Created Successfully",data:blog})
        })
})

//see all blogs

app.get('/AllBlogs', async(req,res)=>{
    let data = await blogModel.find()
    res.send({success:true,message:'All Blogs',data:data})
})

//update blog

app.put("/UpdateBlog",upload,async(req,res)=>{
    const data = await blogModel.updateOne({blogId:req.body.blogId},{$set:{title:req.body.title,description:req.body.description,category:req.body.category,blogpic:req.file.filename}})
    res.send({success:true,message:'Blog Updated',data:data})
})

//delete blogs

app.delete("/DeleteBlog",async(req,res)=>{
    const data = await blogModel.deleteOne({blogId:req.body.blogId})
    res.send({success:true,message:'Blog Deleted',data:data})
})

app.listen(4000)