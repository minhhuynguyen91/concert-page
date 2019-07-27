const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var concertController = require('./concert');

var authController = require('./auth');
var userController = require('./user'); 
var refController = require('./referrals');

routes.route('/')
  .get(homeController.index);

routes.route('/contact')
  .get(homeController.contact);

routes.route('/concert/new')
  .get(concertController.new);


routes.route('/concerts/:id/edit')
  .get(concertController.edit);

routes.route('/concerts')
  .get(concertController.index)
  .post(concertController.post);

routes.route('/concerts/:id') 
  .get(concertController.id)
  .put(concertController.put)
  .delete(concertController.delete);


routes.route('/login') 
  .get(authController.get)
  .post(authController.post);

routes.route('/logout') 
  .get(authController.logout);

routes.route('/user')
  .post(userController.create);

routes.route('/referrals')
  .post(refController.post);

routes.route('/referrals/new')
  .get(refController.new);

routes.route('/referrals/:id')
  .delete(refController.delete);

module.exports = routes;