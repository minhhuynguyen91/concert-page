var mongo = require('mongodb');
const mongoose = require('mongoose');

const Concert = mongoose.model('Concert');

const { body, validationResult } = require('express-validator/check');


exports.index = function(req, res) {
  Concert.find()
    .then((concerts) => {
      res.render('concert/concerts', {concerts});
    })

    .catch(() => {
      res.send('something went wrong');
    }) 

};

exports.new = function(req, res) {
  const concert = {title: '', content: ''};
  res.render('concert/new', {title: 'Create concert event', method: 'POST', action:'/concerts' , concert});

};

exports.edit = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Concert.findOne( { '_id': objectId} )
    .then((concert) => {
      res.render('concert/edit', {title: 'Update concert event', method: 'POST', action:'/concerts/' +  objectId  + '?_method=put' ,concert});
    })

    .catch(() => {
      res.send('something went wrong');
    })
};

exports.put = function (req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  console.log(req.body);

  Concert.findOneAndUpdate({'_id' : objectId}, { 'title' :req.body.title, 'content':req.body.content}, {new: true})

    .then((concert) => {
      res.render('concert/concert', {concert});
    })
    .catch(() => {
      res.send('something went wrong');
    });

};

exports.id = function (req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  var showdown = require('showdown'),
      converter = new showdown.Converter();

  Concert.findOne( { '_id': objectId} )
    .then((concert) => {
      concert.content = converter.makeHtml(concert.content);
      res.render('concert/concert', {concert});
    })

    .catch(() => {
      res.send('something went wrong');
    });
};

exports.post = function (req, res) {
    [
    body('title')
      .isLength({min: 1})
      .withMessage('Please enter the title'),

    body('content')
      .isLength({min: 1})
      .withMessage('Please enter the content')
  ],

  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const concert = new Concert(req.body);
      concert.save()
        .then(() => { res.send('The concert is updated successfully'); })
        .catch(() => { res.send('Sorry, something went wrong!'); });

    } else {
      res.render('concert/new', {
        title: 'Create concert',
        errors: errors.array(),
        data: req.body
      });
    }
  }
};