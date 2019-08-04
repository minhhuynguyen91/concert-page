const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  thumbnail_image_url: {
    type: String,
    default: null
  },

  displayOrder: {
    type: Number,
    default: 0
  },


  url: {
    type: String,
    trim: true
  }
  
});

module.exports = mongoose.model('Referral', concertSchema);