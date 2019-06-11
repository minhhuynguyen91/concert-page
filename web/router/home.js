const mongoose = require('mongoose');
const Concert = mongoose.model('Concert');

exports.index = function(req, res) {
  Concert.find()
    .then((concerts) => {
      res.render('homes/index', {header: 'home', concerts});
    })
    .catch((err) => {
      res.send('Something went wrong!');
    });
};

exports.contact = function(req, res) {
  res.render('homes/contact');
};