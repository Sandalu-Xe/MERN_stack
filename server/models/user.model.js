const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('User', userSchema);
