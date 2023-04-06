const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  username:{ 
        type:String, 
        // required:true,
        // unique:true
},
  password:{ 
    type:String, 
    // required:true,
    // unique:true 
},
  role:{ 
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Roles', 
   // required: true 
},
  
},{timestamps:true});

module.exports = mongoose.model('User', usersSchema);
