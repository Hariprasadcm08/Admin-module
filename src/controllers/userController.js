const userModel=require("../models/userModel")
const adminModel=require("../models/adminModel")
const mongoose=require('mongoose')
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();


const createUser = async function(req, res) {
    try {
      let data = req.body;
      console.log(data);
      let { gmail, password, role } = data;
      let adminId = req.headers["admin-id"];
      let resObj = {};
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        secure: true // added option
      });
      
  
      //===================================validation==============================================================//
      let adminIdCheck = await adminModel.findOne({ _id: adminId });
      if (!adminIdCheck) {
        return res
          .status(400)
          .send({ status: false, message: "Invalid adminId" });
      }
  
      //=============validation check if admin didn't provide any required field=============//
      let newArr = ["name", "gmail", "password", "role"];
      for (i of newArr) {
        if (!data[i])
          return res
            .status(400)
            .send({ status: false, msg: ` ${i} is mandatory please input ${i}` });
      }
      //=============validation check if admin didn't provide details in any required field=============//
      let array = Object.keys(data);
      for (i of array) {
        if (data[i].trim() == "") {
          return res
            .status(400)
            .send({ status: false, msg: ` ${i} can't be empty` });
        }
      }
      //==================================================================================================//
  
      //============Check if email is already registered===============================//
      let emailCheck = await userModel.findOne({ gmail: gmail });
      if (emailCheck) {
        return res
          .status(400)
          .send({ status: false, message: "Email already registered" });
      }
  
      //============Generating a unique one-time password token===============================//
      const token = crypto.randomBytes(20).toString("hex");
      const link = `http://localhost:3000/otp?token=${token}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: gmail,
        subject: "One-time Password Link",
        html: `Click <a href="${link}">here</a> to set your password. This link will expire in 5 minutes.`,
      });
  
      let registerDetails = await userModel.create(data);
      return res.status(201).send({ status: true, data: registerDetails });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  
module.exports={createUser}