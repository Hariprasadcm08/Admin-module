const userModel=require("../models/userModel")
const adminModel=require("../models/adminModel")

const nodemailer = require('nodemailer')
const crypto = require('crypto')
const {regexvalidName,regexValidNumber,regexValidgmail,passwordRegex}=require("../validation")

const createRole = async function(req, res) {
  try {
    let adminId = req.params.adminId;
    let data = req.body;
    let {name, gmail, password, role ,phone} = data;


    let admin = await adminModel.findOne({ adminId: adminId });
    if (!admin) {
      return res.status(400).send({ status: false, message: `Only admins are allowed to create ${data.role}` });
    }

    //=======================================validation ==================================================//
    if (!name.match(regexvalidName)){
      return res.status(400).send({ status: false, msg: "please enetr a valid name" });
      }

    if(!phone.match(regexValidNumber)){
      return res.status(400).send({ status: false, msg: "please enetr a valid phone number" })
    }

    if (!gmail.match(regexValidgmail)){
            return res.status(400).send("Enter Valid Email")
    }

    if (!password.match(passwordRegex))
            return res.status(400).send({ status: false, message: "Password Should contain min 1 uppercase , lowercase and one special character" })
//=======================================================================================================================================================//
  

//=================generating the unique otp of 6 digits=============================================//
    let  otp = crypto.randomInt(100000, 1000000).toString().padStart(6, '0');
     
    let transporter=nodemailer.createTransport({
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

    res.status(201).send({ status: true, message: `OTP has been sent to the given id i.e ${gmail} \n ${userdata}` });
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
