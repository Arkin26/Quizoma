const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // adjust as needed
  }
}, { timestamps: true });

module.exports = mongoose.model('loginusers', userSchema);
