const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var concertController = require('./concert');

// var authController = require('./auth');
var userController = require('./user');

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


// routes.route('/login') 
//   .get(authController.get)
//   .post(authController.post);

// console.log(authController);

// routes.route('/login')
//   .post(authController.optional, function(req, res, next) {
//     authController.post;
//   })

routes.route('/user')
  .post(userController.create);
  
module.exports = routes;