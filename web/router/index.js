const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var concertController = require('./concert');

var authController = require('./auth');
var userController = require('./user'); 
var refController = require('./referrals');
var artistController = require('./artist');
var timelineController = require('./timeline');
var commencedDateController = require('./commenced_date');
var referralVideoController = require('./referral_video');
var concertNewsController = require('./concertNews');


routes.route('/')
  .get(homeController.index);

routes.route('/contact')
  .get(homeController.contact);

routes.route('/concert/new')
  .get(concertController.new);

routes.route('/concerts')
  .get(concertController.index)
  .post(concertController.post);

routes.route('/concerts/:id') 
  .get(concertController.id)
  .put(concertController.put)
  .delete(concertController.delete);

routes.route('/concerts/:id/edit')
  .get(concertController.edit);


routes.route('/artists')
  .get(artistController.index)
  .post(artistController.post);

routes.route('/artists/new')
  .get(artistController.new);

routes.route('/artists/:id')
  .get(artistController.id)
  .put(artistController.put)
  .delete(artistController.delete);

routes.route('/artists/:id/edit')
  .get(artistController.edit);


routes.route('/login') 
  .get(authController.get)
  .post(authController.post);

routes.route('/logout') 
  .get(authController.logout);

routes.route('/user')
  .post(userController.create);

routes.route('/referrals')
  .post(refController.post)
  .get(refController.index);

routes.route('/referrals/new')
  .get(refController.new);

routes.route('/referrals/:id')
  .put(refController.put)
  .delete(refController.delete);

routes.route('/referrals/:id/edit')
  .get(refController.edit);

routes.route('/timelines')
  .get(timelineController.index);

routes.route('/commencedDates')
  .get(commencedDateController.index)
  .post(commencedDateController.post);

routes.route('/commencedDates/new')
  .get(commencedDateController.new);

routes.route('/commencedDates/:id')
  .get(commencedDateController.id)
  .put(commencedDateController.put)
  .delete(commencedDateController.delete);

routes.route('/commencedDates/:id/edit')
  .get(commencedDateController.edit);


routes.route('/referralVideos')
  .get(referralVideoController.index)
  .post(referralVideoController.post);

routes.route('/referralVideos/new')
  .get(referralVideoController.new);


routes.route('/referralVideos/:id')
  .get(referralVideoController.id)
  .put(referralVideoController.put)
  .delete(referralVideoController.delete);


routes.route('/referralVideos/:id/edit')
  .get(referralVideoController.edit);


routes.route('/concertNews')
  .get(concertNewsController.index)
  .post(concertNewsController.post);

routes.route('/concertNews/new')
  .get(concertNewsController.new);


routes.route('/concertNews/:id')
  .get(concertNewsController.id)
  .put(concertNewsController.put)
  .delete(concertNewsController.delete);


routes.route('/concertNews/:id/edit')
  .get(concertNewsController.edit);


module.exports = routes;