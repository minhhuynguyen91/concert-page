const express = require('express') 
const app = express();
const routes = require('./web/router/index');
const bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');


app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug')
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/moment', express.static(__dirname + '/node_modules/moment'));
app.use('/tempusdominus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build'));
app.use('/simplemde', express.static(__dirname + '/node_modules/simplemde/dist'));

// Stylesheet
app.use(express.static(path.join(__dirname, '/public')));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.use('/concerts/new', routes);
app.use('/concerts', routes);
app.use('/concerts/:id', routes);
app.use('/concerts/:id/edit', routes);

app.locals.moment = require('moment');
module.exports = app;
