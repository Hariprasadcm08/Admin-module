const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const route=require('./routes/route.js')

const app = express();
app.use(express.json())

// Load environment variables
require('dotenv').config();

// Set up session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: new session.MemoryStore(),
//   })
// );
  

//mongoose.set('strictQuery',true)
mongoose.connect("mongodb+srv://rajgupta07082000:0Um5TBcHGam3DxeZ@cluster0.p92r9bx.mongodb.net/admin-moduletask",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb is connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("running on"+ 3000)
})
