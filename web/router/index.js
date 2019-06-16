const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var concertController = require('./concert');

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

  
module.exports = routes;