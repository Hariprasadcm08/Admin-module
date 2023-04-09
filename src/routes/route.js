const express= require('express')
const router= express.Router()
const {createRole,getUser} = require('../controllers/userController.js')
const {createAdmin,login}=require('../controllers/adminController.js')
const {createTransaction,updateTransaction,getTransaction,deleteTransaction}=require('../controllers/transactionController.js')
const {sessionAuthentication}=require("../auth")


router.post("/createRole",sessionAuthentication,createRole)
router.post("/createAdmin",sessionAuthentication,createAdmin)
router.get("/getUser",sessionAuthentication,getUser)
router.post("/login",login)


//==================transaction api's=================================================//

router.post('/generateTransaction/:id',sessionAuthentication,createTransaction)
router.get('/getTransaction',getTransaction)
router.put('/updateTransaction/:userId',sessionAuthentication,updateTransaction)
router.delete('/deleteTransaction/:fileName',sessionAuthentication,deleteTransaction)

router.all("/*", function (req, res) {
    try{
    res.status(404).send({status: false,msg: "The api you request is not available"})

}catch(err){res.send(err.message)}})
  
  
  

module.exports=router                   









