const express= require('express')
const router= express.Router()
const userModel=require("../models/userModel.js")
const {createRole,getUser} = require('../controllers/userController.js')
const {createAdmin}=require('../controllers/adminController.js')
const {createTransaction,updateTransaction,getTransaction,deleteTransaction}=require('../controllers/transactionController.js')
const {sessionAuthentication}=require("../auth")


router.post("/createRole",createRole)
router.post("/createAdmin",createAdmin)
router.get("/getUser",getUser)


//==================transaction api's=================================================//

router.post('/generateTransaction/:id',createTransaction)
router.get('/getTransaction',getTransaction)
router.put('/updateTransaction',updateTransaction)
router.delete('/deleteTransaction/:fileName',deleteTransaction)

router.all("/*", function (req, res) {
    try{
    res.status(404).send({status: false,msg: "The api you request is not available"})

}catch(err){res.send(err.message)}})
  
  
  

module.exports=router                   









