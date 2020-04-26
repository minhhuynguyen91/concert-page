const express = require('express');

const routes = express.Router();


var homeController = require('./home/home');
var concertController = require('./concert/concert');

var authController = require('./auth/auth');
var userController = require('./user/user'); 
var refController = require('./referrals/referrals');
var artistController = require('./artist/artist');
var timelineController = require('./timeline/timeline');
var commencedDateController = require('./commenced_date/commenced_date');
var referralVideoController = require('./referral_video/referral_video');
var concertNewsController = require('./concertNews/concertNews');


routes.route('/')
  .get(homeController.index);

routes.route('/contact')
  .get(homeController.contact);

routes.route('/concert/new')
  .get(authController.authorization, concertController.new);

routes.route('/concerts')
  .get(concertController.index)
  .post(concertController.post);

routes.route('/concerts/:id') 
  .get(concertController.id)
  .put(authController.authorization, concertController.put)
  .delete(authController.authorization, concertController.delete);

routes.route('/concerts/:id/edit')
  .get(authController.authorization, concertController.edit);


routes.route('/artists')
  .get(artistController.index)
  .post(authController.authorization, artistController.post);

routes.route('/artists/new')
  .get(authController.authorization, artistController.new);

routes.route('/artists/:id')
  .get(artistController.id)
  .put(authController.authorization, artistController.put)
  .delete(authController.authorization, artistController.delete);

routes.route('/artists/:id/edit')
  .get(authController.authorization, artistController.edit);


routes.route('/login') 
  .get(authController.get)
  .post(authController.post);

routes.route('/logout') 
  .get(authController.logout);

routes.route('/user')
  .post(authController.authorization, userController.create);

routes.route('/referrals')
  .post(authController.authorization, refController.post)
  .get(refController.index);

routes.route('/referrals/new')
  .get(refController.new);

routes.route('/referrals/:id')
  .put(authController.authorization, refController.put)
  .delete(authController.authorization, refController.delete);

routes.route('/referrals/:id/edit')
  .get(authController.authorization, refController.edit);

routes.route('/timelines')
  .get(timelineController.index);

routes.route('/commencedDates')
  .get(commencedDateController.index)
  .post(authController.authorization, commencedDateController.post);

routes.route('/commencedDates/new')
  .get(commencedDateController.new);

routes.route('/commencedDates/:id')
  .get(commencedDateController.id)
  .put(authController.authorization, commencedDateController.put)
  .delete(authController.authorization, commencedDateController.delete);

routes.route('/commencedDates/:id/edit')
  .get(authController.authorization, commencedDateController.edit);


routes.route('/referralVideos')
  .get(referralVideoController.index)
  .post(authController.authorization, referralVideoController.post);

routes.route('/referralVideos/new')
  .get(authController.authorization, referralVideoController.new);


routes.route('/referralVideos/:id')
  .get(referralVideoController.id)
  .put(authController.authorization, referralVideoController.put)
  .delete(authController.authorization, referralVideoController.delete);


routes.route('/referralVideos/:id/edit')
  .get(authController.authorization, referralVideoController.edit);


routes.route('/concertNews')
  .get(concertNewsController.index)
  .post(authController.authorization, concertNewsController.post);

routes.route('/concertNews/new')
  .get(authController.authorization, concertNewsController.new);


routes.route('/concertNews/:id')
  .get(concertNewsController.id)
  .put(authController.authorization, concertNewsController.put)
  .delete(authController.authorization, concertNewsController.delete);


routes.route('/concertNews/:id/edit')
  .get(authController.authorization, concertNewsController.edit);




// api routing
routes.route('/api/v1/concerts/index')
  .get(concertController.getIndex);

routes.route('/api/v1/concerts/:id')
  .get(concertController.getId);

routes.route('/api/v1/commencedDates/index')
  .get(commencedDateController.getIndex);


module.exports = routes;