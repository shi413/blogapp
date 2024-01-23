const express = require('express')
const app = express()

PORT = 3482
app.get("/",async(req,res)=>{
    const data = ({rollno:102,name:"Ram",marks:100})
    const result = await data.save()
    res.send(result)
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})