const express= require('express')
const router= express.Router()



router.post("/registre",async function(req,res){
    let data=req.body
    res.send(data)
})

module.exports=router