const mongoose = require('mongoose');
var mongo = require('mongodb');
const ConcertNews = mongoose.model('ConcertNews');

exports.new = function(req, res) {
  concertNews = {}
  res.render('concertNews/new', 
    {
      session: req.session, concertNews,
      action: '/concertNews'
    });
}

exports.post = function(req, res) {
  var newImageLink = req.body.img_link.replace(/\r?\n|\r/g, '');
  req.body.img_link = newImageLink;
  const concertNews = new ConcertNews(req.body);
  concertNews.save()
    .then(() => {
      res.redirect('/concertNews');
    })
  
    .catch((err) => {
      console.log(err);
      res.send('Cannot create the news');
    })
  
}

exports.index = function(req, res) {
  ConcertNews.find().sort({'displayOrder': 1, '_id': -1})
    .then((concertNewsIndex) => {
      res.render('concertNews/index', 
      {
        session: req.session,
        concertNewsIndex
      })
    })
  
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the news')
    })
}

exports.id = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  var marked = require('marked');
  
  ConcertNews.findOne({'_id' : objectId})
    .then((concertNews) => {
      var newsImageLinks = concertNews.img_link.split(";").filter(String);
      concertNews.content = marked(concertNews.content);
      res.render('concertNews/show', 
      {
        session: req.session,
        concertNews, newsImageLinks
      })
    })
  
    .catch((err) => {
      console.log(err);
      res.send('Cannot find the news');
    });
  
}

exports.edit = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  ConcertNews.findOne({'_id' : objectId})
    .then((concertNews) => {
      concertNews.img_link = concertNews.img_link.replace(/;/g, ';\\r\\n');
      try { 
    	  var newContent = concertNews.content.replace(/`/g, '\\`');
    	  concertNews.content = newContent;
      } catch(err) {
        
      }
    
      res.render('concertNews/edit', {
        session: req.session,
        concertNews,
        action: '/concertNews/' +  concertNews._id + '?_method=put'
      })
    })
  
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the update page');
    });
}

exports.put = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  var newImageLink = req.body.img_link.replace(/\r?\n|\r/g, '');
  req.body.img_link = newImageLink;
  
  ConcertNews.findOneAndUpdate({'_id' : objectId},
    {
      'title' : req.body.title,
      'img_link' : req.body.img_link,
      'content' : req.body.content,
      'displayOrder' : req.body.displayOrder
    
    }, {returnNewDocument: true})
    .then((concertNews) => {
      res.redirect('/concertNews');
    })
  
    .catch((err) => {
      console.log(err);
      res.send("Cannot update the theater's new");
    })
}

exports.delete = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  ConcertNews.deleteOne({'_id' : objectId})
    .then(() => {
      res.redirect('/concertNews');
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot delete the news');
    })  
  
}