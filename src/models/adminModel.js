const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  roll:{
    type:String,
    default:"admin"
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
