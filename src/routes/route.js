const express= require('express')
const router= express.Router()
const userModel=require("../models/userModel.js")
const {createUser}=require('../controllers/userController.js')
const {createAdmin}=require('../controllers/adminController.js')


router.post("/createUser",createUser)
router.post("/createAdmin",createAdmin)


  
  
  

module.exports=router                   









