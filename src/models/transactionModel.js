const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  description:{ 
    type: String, 
    required: true 
},
  date:{
    type:Date, 
    required: true 
},
  amount:{ 
    type: Number, 
    required: true
},
  
});

module.exports = mongoose.model('Transaction', transactionSchema);
