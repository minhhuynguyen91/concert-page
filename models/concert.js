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

  note: {
    type: String,
    trim: true,
    default: null
  },

  tickets: {
    type: Number,
    default: 0
  },

  displayOrder: {
    type: Number,
    default: 0
  },

  seat_image_url: {
    type: String,
    default: null
  },


  commencedDateIds: [{type: mongoose.Schema.Types.ObjectId}],

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