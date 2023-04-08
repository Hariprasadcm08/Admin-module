const userModel=require("../models/userModel")
const adminModel=require("../models/adminModel")
const session = require('express-session')
const speakeasy = require('speakeasy')
const nodemailer = require('nodemailer')


const createRole = async function(req, res) {
  try {
    let adminId = req.params.adminId;
    let data = req.body;
    let { name, gmail, password, role } = data;

    let admin = await adminModel.findOne({ adminId: adminId });
    if (!admin) {
      return res.status(400).send({ status: false, message: `Only admins are allowed to create ${data.role}` });
    }

  
    let  otp = crypto.randomInt(100000, 1000000).toString().padStart(6, '0');
     
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: req.body.gmail,
        pass: req.body.password
      }
    });

    let info = await transporter.sendMail({
      from: 'your-email@gmail.com', // sender address
      to: gmail, // list of receivers
      subject: 'One-Time Password', // Subject line
      text: `Your one-time password is ${otp}. This password will expire in 10 minutes.`, // plain text body
      html: `<p>Your one-time password is <strong>${otp}</strong>. This password will expire in 10 minutes.</p>`, // html body
    });

    // Store the OTP in the database for later verification
    await userModel.create({ name, gmail, password, role, otp });

    res.status(200).send({ status: true, message: `An OTP has been sent to ${gmail}` });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};




const getUser=async function(req,res){
  try{
    let data = req.query
    let conditions = { isDeleted: false}

    if(data.role==("Power User"||"admin")){
       let fetchUser = await userModel.find(conditions)
      if(fetchUser.length == 0){
        return res.status(404).send({status:false,message:"No user found"})
    };
       return res.status(200).send({status:true,message:"Success",data:fetchUser})
    }else{
      return res.status(401).send({status:false,message:"not authorised to get the data"})
    }
  }
   catch(error){
    return res.status(500).send({status:false,message:"error.message"})
  }
}

module.exports={createRole,getUser}