const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  gmail: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  role:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
    required: true,
    enum: ['Power User', 'User', 'Support Desk'],
  },
  transactions: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Transaction'
  }]
});

module.exports = mongoose.model('User', userSchema);
