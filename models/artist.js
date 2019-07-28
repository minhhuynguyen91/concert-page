const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  profile_img_link: {
    type: String,
    default: null
  },

  bio: {
    type: String
  }
  
});

module.exports = mongoose.model('Artist', artistSchema);