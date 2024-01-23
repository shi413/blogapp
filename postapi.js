const express = require('express')
const {blogModel} = require('./blogModel')
const multer = require('multer')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
require('./Dbconnection/mongoose')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage}).single("image")

app.post("/Add",async(req,res)=>{

    upload(req,res, async(err)=>{
        const blogs = new blogModel({
            name:req.body.name,
            image:"localhost:12345/uploads/"+req.file.filename
        })
        await blogs.save()
        res.send("File Uploaded")
    })

    // const data = await new blogModel(req.body)
    // const result = await data.save();
    // res.status(201).send({success:true,message:'Data Added',data:result})
}).listen(12345)







// app.get("/GetAdd",async(req,res)=>{
//     const data = await studentModel.find()
//     res.status(201).send({success:true,message:'Find Data',data:data})
// }).listen(12345)

// app.put("/UpdateData",async(req,res)=>{
//     const data = await studentModel.updateOne({rollno:req.body.rollno},{$set:{name:req.body.name}})
//     res.status(201).send({success:true,message:'Updated',data:data})
// }).listen(12345)

// app.delete("/DeleteData",async(req,res)=>{
//     const data = await studentModel.deleteOne({rollno:req.body.rollno})
//     res.status(201).send({success:true,message:'Deleted',data:data})
// }).listen(12345)
