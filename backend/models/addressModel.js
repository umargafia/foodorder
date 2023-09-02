const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  country: {
    type: String
  },
  state: {
    type: String,
    required: true
  },
  localGov: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  }
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
