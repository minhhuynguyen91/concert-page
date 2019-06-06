const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
  img_link: {
    type: String,
    trim: true,
    default: null
  },
  tickets: {
    type: Number,
    default: 0
  },

  start_date: {
    type: Date,
    default: Date.now
  },

  start_time: {
    type: Date,
    default: Date.now
  },

  end_date: {
    type: Date,
    default: Date.now
  },

  end_time: {
    type: Date,
    default: Date.now
  },


  created_date: {
    type: Date,
    default: Date.now
  },

  updated_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Concert', concertSchema);