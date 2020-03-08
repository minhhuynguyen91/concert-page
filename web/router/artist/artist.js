var mongo = require('mongodb');
const mongoose = require('mongoose');

const Artist = mongoose.model('Artist');

exports.index = function(req, res) {
  Artist.find().sort({'displayOrder' : 1})
    .then((artists) => {
      res.render('artists/artists', {artists, session: req.session});
    })
    .catch((err) => {
      console.log(err);
      res.send('Something went wrong in artists page');
    });
};

exports.post = function (req, res) {
  req.body.profile_img_link = (req.body.profile_img_link) ? req.body.profile_img_link : "https://via.placeholder.com/150x150";
  const artist = new Artist(req.body);

  artist.save()
    .then(() => {res.redirect('/');})
    .catch((err) => {
      console.log(err);
      res.send('cannot create an artist');
    });
};


exports.id = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  var marked = require('marked');

  Artist.findOne({'_id' : objectId })
    .then((artist) => {
      Artist.find({'_id' : {$ne: artist._id} })
        .then((relatedArtists) => {
          artist.bio = marked(artist.bio);
          res.render('artists/show', {artist, relatedArtists,session: req.session});
        })
    
        .catch((err) => {
          console.log(err);
          res.send('Cannot get relative artists');
        
        });
    })

    .catch((err) => {
      console.log(err);
      res.send('Something went wrong in artist bio');
    });
};

exports.new = function(req, res) {
  const artist = {name: '', bio: '', profile_img_link: ''};
  res.render('artists/new', {title: "Add artist's bio", method: 'POST', action: '/artists', artist, session: req.session});
};


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

      res.render('artists/edit', {title: "Update artist's bio content", method: 'POST', action: '/artists/' + objectId + '?_method=put', artist, session: req.session});

    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get artist edit page');
    });
};

exports.put = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Artist.findOneAndUpdate({'_id' : objectId}, 
  {
    'name' : req.body.name,
    'profile_img_link' : req.body.profile_img_link,
    'displayOrder' : req.body.displayOrder,
    'bio' : req.body.bio

  }, {new: true})

    .then((artist) => {
      var marked = require('marked');
      artist.bio = marked(artist.bio);
      res.redirect('/artists');

    })

    .catch((err) => {
      console.log(err);
      res.send('cannot update artist page');
    });
};

exports.delete = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Artist.deleteOne({'_id' : objectId})
    .then(() => {res.redirect('/artists');})
    .catch((err) => {console.log(err);});
};