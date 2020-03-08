var mongo = require('mongodb');

const mongoose = require('mongoose');

const Referral = mongoose.model('Referral');

const { body, validationResult } = require('express-validator/check');

exports.post = function(req, res) {
  req.body.thumbnail_image_url = (req.body.thumbnail_image_url) ? req.body.thumbnail_image_url : "https://via.placeholder.com/200x200";


  var ref = new Referral(req.body);
  ref.save()
    .then(() => { 
      res.redirect('/referrals'); 
  })
    .catch((err) => {
      console.log(err);
      res.render('referrals/new');
  });
};

exports.new = function(req, res) {
  var referral = {};
  res.render('referrals/new', {referral, action: '/referrals' , session: req.session});
};

exports.index = function(req, res) {
  Referral.find().sort({'displayOrder': 1, '_id': -1})
    .then((referrals) => {
      res.render('referrals/referrals', {referrals, session : req.session});
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the referral index page');
    });
};

exports.edit = function(req, res) {
  var objectId = new mongo.ObjectId(req.params.id);
  Referral.findOne({_id : objectId})
    .then((referral) => {
      res.render('referrals/edit', 
        { 
          referral,
          action: '/referrals/' + objectId + '?_method=put',
          session: req.session
        });
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot remove the referral record');
    });
};

exports.put = function(req, res) {
  const objectId = mongo.ObjectId(req.params.id);
  req.body.thumbnail_image_url = (req.body.thumbnail_image_url) ? req.body.thumbnail_image_url : "https://via.placeholder.com/200x200";


  Referral.findOneAndUpdate({'_id' : objectId },
    {
      title : req.body.title,
      thumbnail_image_url: req.body.thumbnail_image_url,
      displayOrder: req.body.displayOrder,
      url : req.body.url
    }, {returnNewDocument: true})
    .then(() => {
      res.redirect('/referrals');
    })
    .catch((err) => {
      console.log(err);
      res.send('Cannot update the referrals');
    })

}

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