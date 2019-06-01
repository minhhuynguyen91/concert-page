const express = require('express') 
const app = express();
const routes = require('./web/router/index');
const bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');


app.set('views', __dirname + '/views');
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/simplemde', express.static(__dirname + '/node_modules/simplemde/dist'));

// Stylesheet
app.use('/style', express.static(__dirname + '/web/stylesheet'));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use('/concert/new', routes);
app.use('/concerts', routes);
app.use('/concerts/:id', routes);
app.use('/concerts/:id/edit', routes);

module.exports = app;
