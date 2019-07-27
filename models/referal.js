const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true
  }
  
});

module.exports = mongoose.model('Referral', concertSchema);