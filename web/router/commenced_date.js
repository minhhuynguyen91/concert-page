var mongo = require('mongodb');
const mongoose = require('mongoose');
const moment = require('moment');

const Concert = mongoose.model('Concert');
const CommencedDate = mongoose.model('CommencedDate');

exports.id = function(res, req) {
  
};

exports.index = function(res, req) {
  
};

exports.post = function(res, req) {
  
};

exports.new = function(res, req) {
  Concert.find()
    .then((concerts) => {
      res.render('commenced_date/new', {concerts, session: req.session}); 
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get the concert data');
    });
};

exports.edit = function(res,req) {
  
};

exports.delete = function(res, req) {
  
};