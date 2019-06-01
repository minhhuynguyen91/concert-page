const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var concertController = require('./concert');

routes.route('/')
  .get(homeController.index);


routes.route('/concerts/new')
  .get(concertController.new);


routes.route('/concerts/:id/edit')
  .get(concertController.edit);

routes.route('/concerts')
  .get(concertController.index);

routes.route('/concerts/:id') 
  .get(concertController.id)
  .put(concertController.put);

routes.route('/concerts')
  .post(concertController.post);

module.exports = routes;