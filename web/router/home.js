const mongoose = require('mongoose');
const Concert = mongoose.model('Concert');
const Referral = mongoose.model('Referral');
const Artist = mongoose.model('Artist');

exports.index = function(req, res) {
  Concert.find().sort({'start_date': 1})
    .then((concerts) => {
      Referral.find()
        .then((referrals) => {
          Artist.find()
            .then((artists) => {
              if (req.session.userId) {
                res.render('homes/index', {header: 'home', concerts, session: req.session, referrals, artists});    
              } else {
                res.render('homes/index', {header: 'home', concerts, session: {}, referrals, artists});
              }
            })
            .catch((err) => {
              res.send('Cannot get the artists');
            });
        })

        .catch((err) => {
          res.send('Cannot get the referral');
        });
    })
    .catch((err) => {
      res.send('Something went wrong!');
    });
};

exports.contact = function(req, res) {
  res.render('homes/contact', {session: req.session});
};