const bcrypt = require('bcrypt')
const adminModel = require("../models/adminModel")
const session = require('express-session')
const {regexvalidName,regexValidNumber,regexValidgmail,passwordRegex}=require("../validation")

const createAdmin = async function (req, res) {
    try {
        let data = req.body
        let {name,gmail,password,phone}=data
        if (Object.keys(data).length == 0) 
        { return res.status(400).send({status:false,message:"provide data to create admin" }) }

        //=======================validation================================================//
        if (!name.match(regexvalidName)){
        return res.status(400).send({ status: false, msg: "please enetr a valid name" });
        }
        if (!phone.match(regexValidNumber)) 
        return res.status(400).send({ status: false, msg: "please enetr a valid phone number" })

        if (!password.match(passwordRegex))
            return res.status(400).send({ status: false, message: "Password Should contain min 1 uppercase , lowercase and one special character" })
      
        if (!gmail.match(regexValidgmail)){
            return res.status(400).send("Enter Valid Email")
        }
  //=================================================================================================//
        data.password = await bcrypt.hash(data.password, 10)
        let createAdmin=await adminModel.create(data)
        return res.status(201).send({status:true,data:createAdmin})
    }
    catch (error){
        return res.status(500).send({ status: false, message: error.message })
    }
}



const login = async function (req, res) {
    try {
        let gmail = req.body.gmail
        let password = req.body.password
        if (!gmail)
        return res.status(400).send({ status: false, message: "gmail is required" })
        if (!password)
        return res.status(400).send({ status: false, message: "password is required" })
  
        if (!gmail.match(regexValidgmail))
        return res.status(400).send("Enter Valid Email")
  
        const check = await UserModel.findOne({ email: gmail, password: password })
        if (!check){
            return res.status(400).send({ status: false, message: "gmail or Password Not Match" })
        }
        const isPasswordValid = await bcrypt.compare(password, check.password);
        if (!isPasswordValid) {
            return res.status(400).send({ status: false, message: "gmail or Password Not Match" })
        }

          // set the session id
          req.session.userId = check._id.toString();
           return res.status(200).send({ status: true, message: "Session ID created", sessionId: req.session.id })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
  }

module.exports={createAdmin,login}