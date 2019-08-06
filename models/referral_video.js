const mongoose = require('mongoose');

const referralVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  srcType: {
    type: String,
    trim: true
  },

  url: {
    type: String,
    trim: true
  }
  
});

module.exports = mongoose.model('ReferralVideo', referralVideoSchema);