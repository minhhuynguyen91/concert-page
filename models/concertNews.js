const mongoose = require('mongoose');

const concertNewsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  displayOrder: {
    type: Number,
    default: 999
  },
  img_link: {
    type: String,
    trim: true,
    default: null
  }
})

module.exports = mongoose.model('ConcertNews', concertNewsSchema);