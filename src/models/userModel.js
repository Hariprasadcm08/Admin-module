const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  gmail:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type:[String],
    required: true,
    enum: ['Power User', 'User', 'Support Desk'],
  },
  isDeleted:{
     type:Boolean,
     default:false
  },
  transactions: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Transaction'
  }]
});

module.exports = mongoose.model('User', userSchema);
