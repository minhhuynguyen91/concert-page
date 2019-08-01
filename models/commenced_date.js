const mongoose = require('mongoose');

const commencedDateSchema = new mongoose.Schema({
  start_date: {
    type: Date,
    default: Date.now
  },
  
  start_time: {
    type: String,
    default: null
  },
  
  end_time: {
    type: String,
    default: null
  },
  
  _concertId: mongoose.Schema.Types.ObjectId
  
});

module.exports = mongoose.model('CommencedDate', commencedDateSchema);