var mongo = require('mongodb');
const mongoose = require('mongoose');

const Concert = mongoose.model('Concert');
const moment = require('moment');

const { body, validationResult } = require('express-validator/check');


exports.index = function(req, res) {
  Concert.find()
    .then((concerts) => {
      res.render('concert/concerts', {concerts, session: req.session});
    })

    .catch(() => {
      res.send('something went wrong');
    });

};

exports.post = function (req, res) {

  // const errors = validationResult(req);
  //
  // console.log(req.body);
  req.body.start_date = moment(req.body.start_date, 'DD/MM/YYYYY').toDate();
  req.body.end_date = moment(req.body.end_date, 'DD/MM/YYYYY').toDate();
  // console.log(req.body);

  const concert = new Concert(req.body);
  concert.save()
    .then(() => { res.redirect('/'); })
    .catch((err) => {
      console.log(err.stack);
      res.send('Sorry, something went wrong!'); 
    });
};


exports.new = function(req, res) {
  const concert = {title: '', content: ''};
  res.render('concert/new', {title: 'Create concert event', method: 'POST', action:'/concerts' , concert, session: req.session});

};

exports.edit = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Concert.findOne( { '_id': objectId} )
    .then((concert) => {
      res.render('concert/edit', {title: 'Update concert event', method: 'POST', action:'/concerts/' +  objectId  + '?_method=put' ,concert});
    })

    .catch(() => {
      res.send('something went wrong');
    });
};

exports.put = function (req, res) {
  const objectId = new mongo.ObjectId(req.params.id);

  Concert.findOneAndUpdate({'_id' : objectId}, 
  { 
    'title' :req.body.title, 
    'content':req.body.content,
    'img_link': req.body.img_link,
    'note' : req.body.note,
    'tickets' : req.body.tickets,
    'start_date' : moment(req.body.start_date, 'DD/MM/YYYY').toDate(),
    'end_date' : moment(req.body.end_date, 'DD/MM/YYYY').toDate(),
    'start_time' : req.body.start_time,
    'end_time' : req.body.end_time,
    'updated_date' : Date.now()
  }, {new: true})

    .then((concert) => {
      var showdown = require('showdown'),
      converter = new showdown.Converter();
      concert.content = converter.makeHtml(concert.content);

      res.render('concert/show', {concert, session: req.session});
    })
    .catch((err) => {
      console.log(err.stack);
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
      res.render('concert/show', {concert, session: req.session});
    })

    .catch(() => {
      res.send('something went wrong');
    });
};

exports.delete = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Concert.deleteOne( { '_id' : objectId } )
    .then(() => { res.redirect('/'); })
    .catch((err) => {console.log(err.stack); });
};