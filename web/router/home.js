const mongoose = require('mongoose');
const Concert = mongoose.model('Concert');

exports.index = function(req, res) {
  Concert.find()
    .then((concerts) => {
      if (req.session.userId) {
        res.render('homes/index', {header: 'home', concerts, session: req.session});    
      } else {
        res.render('homes/index', {header: 'home', concerts, session: {}});
      }  

    })
    .catch((err) => {
      res.send('Something went wrong!');
    });
};

exports.contact = function(req, res) {
  res.render('homes/contact', {session: req.session});
};