var mongo = require('mongodb');
const mongoose = require('mongoose');

const Artist = mongoose.model('Artist');

exports.index = function(req, res) {
  Artist.find()
    .then((artists) => {
      res.render('artists/artists', {artists, session: req.session})
    })
    .catch((err) => {
      console.log(err);
      res.send('Something went wrong in artists page');
    })
};

exports.post = function (req, res) {
  req.body.profile_img_link = (req.body.profile_img_link) ? req.body.profile_img_link : "https://via.placeholder.com/50x50";
  const artist = new Artist(req.body);

  artist.save()
    .then(() => {res.redirect('/artists')})
    .catch((err) => {
      console.log(err);
      res.send('cannot create an artist');
    });
}


exports.id = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  var showdown = require('showdown'),
  converter = new showdown.Converter();

  Artist.findOne({'_id' : objectId })
    .then((artist) => {
      artist.bio = converter.makeHtml(artist.bio);
      res.render('artists/show', {artist, session: req.session})
    })

    .catch((err) => {
      console.log(err);
      res.send('Something went wrong in artist bio');
    })
};

exports.new = function(req, res) {
  const artist = {name: '', bio: '', profile_img_link: ''};
  res.render('artists/new', {title: "Add artist's bio", method: 'POST', action: '/artists', artist, session: req.session});
}


exports.edit = function(req, res) {  
  const objectId = new mongo.ObjectId(req.params.id);

  req.body.profile_img_link = (req.body.profile_img_link) ? req.body.profile_img_link : "https://via.placeholder.com/50x50";

  Artist.findOne( {'_id' : objectId} )
    .then((artist) => {
      try {
        var newBio = artist.bio.replace(/`/g, '\\`');
        artist.bio = newBio;
      }
      catch(err){
        
      }

      res.render('artists/edit', {title: "Update artist's bio content", method: 'POST', action: '/artists/' + objectId + '?_method=put', artist, session: req.session})

    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get artist edit page');
    })
}

exports.put = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Artist.findOneAndUpdate({'_id' : objectId}, 
  {
    'name' : req.body.name,
    'profile_img_link' : req.body.profile_img_link,
    'bio' : req.body.io

  }, {new: true})

    .then((artist) => {
      var showdown = require('showdown'),
      converter = new showdown.Converter();
      artist.bio = converter.makeHtml(artist.bio);
      res.render('artists/show', {artist, session: req.session});

    })

    .catch((err) => {
      console.log(err);
      res.send('cannot update artist page');
    })
}

exports.delete = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Artist.deleteOne({'_id' : objectId})
    .then(() => {res.redirect('/artists')})
    .catch((err) => {console.log(err)});
}