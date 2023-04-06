const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    unique:true
  }
},{timestamp:true});

module.exports = mongoose.model('admin', adminSchema);
