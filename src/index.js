const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const nodemailer = require('nodemailer')
const multer=require('multer')
const route=require('./routes/route.js')

const app = express()
app.use(express.json())
app.use(multer().any())



app.use(
  session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false,
    cookie: {
      maxAge: 3600000,
      sameSite: true,
      secure: false, 
    },
  })
);
  

mongoose.connect("mongodb+srv://hariprasadcm:harIprasad@cluster0.ahvii9p.mongodb.net/admin-module",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("running on"+ 3000)
})
