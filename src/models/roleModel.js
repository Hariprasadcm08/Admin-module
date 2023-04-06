const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Admin','Power User', 'User', 'Support Desk']
  },
  permissions: [{
    type: String,
    enum: ['create', 'read', 'update', 'delete']
  }],

});

module.exports = mongoose.model('Roles', roleSchema);
