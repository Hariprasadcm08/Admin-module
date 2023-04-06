const adminModel = require("../models/adminModel")


const createAdmin = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) 
        { return res.status(400).send({ status: false, message: "provide data to create admin" }) }

        let createAdmin=await adminModel.create(data)
        return res.status(201).send({status:true,data:createAdmin})
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports={createAdmin}