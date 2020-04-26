var mongo = require('mongodb');
const mongoose = require('mongoose');
const moment = require('moment');

const Concert = mongoose.model('Concert');
const CommencedDate = mongoose.model('CommencedDate');

exports.id = function(req, res) {
  
};

exports.index = function(req, res) {
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
  ]).sort({'start_date': 1}).then((commencedDates) => {
    //console.log(commencedDates);
    res.render('commenced_date/commenced_dates', 
    {
      session: req.session,
      commencedDates
                                                 
    });
    // res.send('Hello bois');
  });

};

exports.post = function(req, res) {
  // console.log(req.body);
  // 1 - Create the commencedDate record,
  // 2 - Update the concert commencedRecordIds
 
  Concert.findOne({'title': req.body.concertName})
    .then((concert) => {
      var linkedConcertId = mongo.ObjectId(concert._id);
      var commencedParams = {
        start_date: moment(req.body.start_date, 'DD/MM/YYYYY').toDate(),
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        _concertId: mongo.ObjectId(concert._id)
      };
    
      const commencedDate = new CommencedDate(commencedParams);
      commencedDate.save()
        .then((commencedDate) => {
          concert.update({
            $push : {commencedDateIds: commencedDate._id}
          })
            .then(() => {
              res.redirect('/commencedDates');
            })
            .catch((err) => {
              console.log(err);
              res.send('Cannot update the concert');
            });

        })
        .catch((err) => {
          console.log(err);
          throw new Error('Cannot save the commenced date');
        });
          
    })
    .catch((err) => {
      console.log(err);
      throw new Error('There is no concert to be found');
    });
  
};

exports.new = function(req, res) {
  var commencedDate = {};
  Concert.find()
    .then((concerts) => {
      res.render('commenced_date/new', {commencedDate, concerts, session: req.session, action:'/commencedDates', method:'POST'}); 
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get the concert data');
     });
};

exports.edit = function(req, res) {
  var objectId = new mongo.ObjectId(req.params.id);
  Concert.find()
    .then((concerts) => {
      CommencedDate.findOne({'_id' : objectId})
        .then((commencedDate) => {
          res.render('commenced_date/edit', 
           {  
              session: req.session, commencedDate, concerts, 
              action: '/commencedDates/' + objectId + '?_method=put',
              method: 'POST'
           });
        })
        .catch((err) => {
          console.log(err);
          res.send('Cannot get the edit page');
        });
  })
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the concerts');
  });  
};

exports.put = function(req, res) {
  // 1 - Remove the exist of the current commencedId from all of the Concert record
  // 2 - Push the current commencedId to the concertId in this current concert
  const commencedId = mongo.ObjectId(req.params.id);
  // Remove the belonged commencedId
  Concert.findOne({commencedDateIds : commencedId})
    .then((removeCommencedIdconcert) => {          
        Concert.findOne({'title': req.body.concertName})
          .then((concert) => {
            // Push the current commencedId to new concert
            // Update the data of the commencedDate
            var updatedConcertId = mongo.ObjectId(concert._id);

            CommencedDate.findOneAndUpdate({'_id': commencedId}, 
             {
               start_date: moment(req.body.start_date, 'DD/MM/YYYYY').toDate(),
               start_time: req.body.start_time,
               end_time: req.body.end_time,
               _concertId: updatedConcertId
             }, {returnNewDocument: true})
              .then((commencedDate) => {
                try {
                  console.log('Remove the id');
                  removeCommencedIdconcert.update(
                    {$pull : {commencedDateIds: commencedId}
                  })
                    .then(() => {
                      concert.update({ 
                        $push: {commencedDateIds : commencedId}
                      })
                      .then(() => {
                        res.redirect('/commencedDates');
                      })
                      .catch((err) => {
                        console.log(err);
                        res.send('Cannot update content');
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      res.send('Cannot remove content');
                    });

                } catch(err) { 
                  console.log('Nothing to remove'); 
                  concert.update({ 
                    $push: {commencedDateIds : commencedId}
                  })
                  .then(() => {
                    res.redirect('/commencedDates');
                  })
                  .catch((err) => {
                    console.log(err);
                    res.send('Cannot update content')
                  });
                }
              })

              .catch((err) => {
                console.log(err);
                res.send('Cannot update the commenced date');

              });

          })

          .catch((err) => {
            console.log(err);
            res.send('Cannot get the Id');
          });
          
    
    })
  
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the related data');
    });
    
};

exports.delete = function(req, res) {
  //1 - Remove the related data from the concert
  //2 - Remove the commenced date
  const commencedId = mongo.ObjectId(req.params.id);
  
  Concert.findOne({commencedDateIds: commencedId})
    .then((concert) => {
      try {
        concert.update({$pull : {commencedDateIds: commencedId}})
          .then(() => {
            CommencedDate.deleteOne({'_id' : commencedId})
              .then((commenced) => {
                res.redirect('/commencedDates');
              })
              .catch((err) => {
                console.log(err);
                res.send('Cannot remove commenced date');
              });
          })
          .catch((err) => {
            console.log(err);
            res.send('Cannot update the concert');
          });
      } catch(err) { 
        console.log('Nothing to remove'); 
        CommencedDate.deleteOne({'_id' : commencedId})
          .then((commenced) => {
            res.redirect('/commencedDates');
        })
          .catch((err) => {
            console.log(err);
            res.send('Cannot remove commenced date');
        });  
      }
  })
    .catch((err) => {
      console.log(err);
      res.send('Cannot get the concert data');
  });
  
  
};


exports.getIndex = function(req, res) {
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
  ]).sort({'start_date': 1})
    .then((commencedDates) => {
      res.status(200).json({success: true, data: commencedDates})
    })

    .catch((err) => {
      res.status(400).json({success: false, err: err})
    });
}