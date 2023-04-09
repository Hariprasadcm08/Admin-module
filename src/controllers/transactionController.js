const transactionModel=require('../models/transactionModel')
const aws=require('aws-sdk')
const userModel=require("../models/userModel")
const {uploadFile,updateFile,getFile,deleteFile}=require('../aws')

const createTransaction=async function(req,res){
    try{
        let files=req.files
        let id=req.params
        
        if(files.length==0)return res.status(400).send({status:false,msg:"profile image is manndatory"})
        let check1=await  userModel.findOne({id:id})
        if(check1.role!==user){
            return res.status(400).send({status:false,message:"not allowed to perform transaction"})
        }
        let PicUrl = await uploadFile(files[0])
        if(!PicUrl)return res.status(400).send({status:false,msg:"can't create data without profile picture"})
        await userModel.save()
        return res.status(201).send({status:true,message:"transaction succesfull",PicUrl})

    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const updateTransaction=async function(req,res){
    try {
        const imageUrl = await updateImage(req.file, req.params.id);
        res.status(200).send({ imageUrl });
      } catch(error) {
        res.status(500).send({error:error.message});
      }
    }


const getTransaction=async function(req,res){
    try{
        const filename = req.params.filename;
        let fetchData=await getFile(filename)
        return res.status(200).send({status:true,data:fetchData})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

const deleteTransaction=async function(req,res){
    try{
        const filename = req.params.filename;
        const id=req.query

        let idCheck=await userModel.findOne({id:id})
        if(idCheck.role!==user){
            return res.status(400).send({status:false,message:"you do not have access to delete this transaction"})
        }
        await deleteFile(filename);
        res.send(`File ${filename} deleted successfully`);
      } catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}


module.exports={createTransaction,updateTransaction,getTransaction,deleteTransaction}

