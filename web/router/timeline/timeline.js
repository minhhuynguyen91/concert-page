var mongo = require('mongodb');
const mongoose = require('mongoose');
const Concert = mongoose.model('Concert');

exports.index = function (req,res) {
  Concert.find().sort({'start_date': 1, 'start_time' : 1})
    .then((concerts) => {
      res.render('timelines/index', {concerts, session: req.session});
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the timelines page');
  });
};