const express=  require("express")
const mongoose= require("mongoose")
const session = require('express-session');
const route= require("./routes/route")

const app= express()

app.use(express.json())


//mongoose.set('strictQuery',true)
mongoose.connect("mongodb+srv://rajgupta07082000:0Um5TBcHGam3DxeZ@cluster0.p92r9bx.mongodb.net/admin_modules",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("running on"+ 3000)
})
