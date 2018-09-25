const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true
  },
  phone: {
      type: String,
      required: true
  },
  verified: {
      type: Boolean,
      default: false
  },
  password: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);