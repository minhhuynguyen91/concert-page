const mongoose = require('mongoose');
const Concert = mongoose.model('Concert');
const Referral = mongoose.model('Referral');
const Artist = mongoose.model('Artist');
const CommencedDate = mongoose.model('CommencedDate');
const ReferralVideo = mongoose.model('ReferralVideo');
const ConcertNews = mongoose.model('ConcertNews');


exports.index = function(req, res) {
  Concert.find().sort({'displayOrder': 1})
    .then((concerts) => {
      Referral.find().sort({'displayOrder': 1, '_id': -1})
        .then((referrals) => {
          ConcertNews.find().sort({'displayOrder' : 1, '_id' : -1})
            .then((concertNewsIndex) => {
              Artist.find().sort({'displayOrder': 1})
                .then((artists) => {
                  ReferralVideo.find().sort({'_id': -1})
                    .then((referralVideos) => {
                      CommencedDate.aggregate([
                      {
                          $lookup:
                          {
                            from: 'concerts',
                            localField: '_concertId',
                            foreignField: '_id',
                            as: 'concertDetail'
                          }
                      }
                      ]).sort({'start_date': 1, 'start_time': 1}).then((commencedDates) => {
                        res.render('homes/index', 
                        { header: 'home', concerts, session: req.session, 
                          referrals, artists, commencedDates,
                          referralVideos, concertNewsIndex
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        res.send('Cannot get commencedDates');
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.send('Cannot get the referral Video');
                    })
                })
                .catch((err) => {
                  console.log(err);
                  res.send('Cannot get the artists');
                });
            })
            .catch((err) => {
              console.log(err);
              res.send('Cannot get the theater news');
            })
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