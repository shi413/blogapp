const express = require('express')
const { userModel } = require('./Models/userModel')
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
const upload = multer({storage:storage}).single("profilepic")

//register user

app.post("/RegisterUser",async(req,res)=>{
    const user = await userModel.findOne({email:req.body.email})
    if(user){return res.send({success:false,message:'Email Already Exist'})}
       
        const users = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            mobile:req.body.mobile,
            userpic:"localhost:4000/uploads/"+req.file.filename
        })
        await users.save()
        res.send({success:true,message:"Registered Successfully",data:users})
    })

//login user

app.post("/Login",async(req,res)=>{
    const {email,password} = req.body;
    let user = await userModel.findOne({email:email})
    if(!user){return res.send({success:false,message:'User Not Registered'})} 
    if(password !=user.password){return res.send('Wrong Password')}
    res.status(201).send({success:true,message:'Login Successfully',data:user})
})

app.get('/AllUsers', async(req,res)=>{
    let data = await userModel.find()
    res.send({success:true,message:'All Users',data:data})
})

app.put("/UpdateUser",async(req,res)=>{
    const data = await userModel.updateOne({name:req.body.name},{$set:{email:req.body.email,password:req.body.password,mobile:req.body.mobile}})
    res.send({success:true,message:'User Updated',data:data})
})

app.delete("/DeleteUser",async(req,res)=>{
    const data = await userModel.deleteOne({name:req.body.name})
    res.send({success:true,message:'User Deleted',data:data})
})


app.listen(4000)