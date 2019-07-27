var mongo = require('mongodb');

const mongoose = require('mongoose');

const Referral = mongoose.model('Referral');

const { body, validationResult } = require('express-validator/check');

exports.post = function(req, res) {
  var ref = new Referral(req.body);
  ref.save()
    .then(() => { 
      res.redirect('/'); 
  })
    .catch((err) => {
      console.log(err);
      res.render('referrals/new');
  });
};

exports.new = function(req, res) {
  res.render('referrals/new', {session: req.session});
};

exports.index = function(req, res) {
  Referral.find()
    .then((referrals) => {
      res.render('referrals/referrals', {referrals, session : req.session});
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the referral index page');
    });
};

exports.delete = function(req, res) {
  var objectId = new mongo.ObjectId(req.params.id);
  Referral.deleteOne({_id : objectId})
    .then(() => {
      res.redirect('/referrals');
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot remove the referral record');
    });
};

exports.id = function(req, res) {

};