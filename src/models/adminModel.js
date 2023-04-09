const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  roll:{
    type:String,
    default:"admin"
  },
  gmail:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  password:{
    type:String,
    required:true,
    unique:true,
    trim:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true,
    trim:true
  }
},{timestamp:true});

module.exports = mongoose.model('admin', adminSchema);
