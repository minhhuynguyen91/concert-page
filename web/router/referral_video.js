var mongo = require('mongodb');
const mongoose = require('mongoose');

const ReferralVideo = mongoose.model('ReferralVideo');

exports.index = function(req, res) {
  ReferralVideo.find()
    .then((referralVideos) => {
      res.render('referralVideo/index', {referralVideos, session: req.session})
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get the video')
    });
}

exports.new = function(req, res) {
  const referralVideo = {}
  res.render('referralVideo/new', 
    {
      session: req.session, referralVideo,
      action: "/referralVideos"
    })
}

exports.post = function(req, res) {
  if (req.body.srcType == "Youtube") {
    req.body.url = req.body.url.replace('watch?v=', 'embed/');
  } else {

  }

  const referralVideo = new ReferralVideo(req.body)
  referralVideo.save()
    .then(() => { res.redirect('/referralVideos')})
    .catch((err) => {
      console.log(err);
      res.send('Cannot create the referral video');
    });
}


exports.edit = function(req, res) {
  const objectId = req.params.id;
  ReferralVideo.findOne({'_id' : objectId})
    .then((referralVideo) => {
      res.render('referralVideo/new', 
      {
        session: req.session, referralVideo,
        action: "/referralVideos/" + referralVideo._id + '?_method=put'
      })
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get the edit page');
    })
}

exports.put = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  if (req.body.srcType == "Youtube") {
    req.body.srcType = req.body.srcType.replace(/watch\?=/i, "\\/embed\\/")
  } else {

  }



  ReferralVideo.findOneAndUpdate({'_id' : objectId},
  {
    'title' : req.params.title,
    'srcType' : req.params.srcType,
    'url' : req.params.url

  }, {returnNewDocument: true})
    .then((referralVideo) => {
      res.redirect('/referralVideos')
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot update the referral Video');
    })
}


exports.delete = function(req, res) {
  const objectId = new mongo.objectId(req.params.id);
  ReferralVideo.deleteOne({'_id' : objectId})
    .then(() => {
      res.redirect('/referralVideos');
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot delete the referral video');
    })
}


exports.id = function(req, res) {
}