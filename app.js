const config = require('./config/web/server');
const express = require('express');
var cors = require('cors');
const app = express();
const routes = require('./web/router/index');
const bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');

var cookieParser = require('cookie-parser');
const session = require('express-session');
// const redis_client = require('./config/web/redis')

app.use(cors());

// app.locals.redis_client = redis_client;

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');

// Js frontend
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/moment', express.static(__dirname + '/node_modules/moment'));
app.use('/tempusdominus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build'));
app.use('/simplemde', express.static(__dirname + '/node_modules/simplemde/dist'));

app.use('/lazyload', express.static(__dirname + '/node_modules/vanilla-lazyload/dist/'));


app.use(express.static(__dirname, { dotfiles: 'allow' } ));


// Stylesheet
const publicPath = path.join(__dirname, '/public');
app.use(express.static(publicPath,
  {
    maxAge: '72h'
  }
));

app.use('/data', express.static(__dirname + '/public/data'));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 3600000}
}));

app.use('/', routes);
app.use('/concerts', routes);

app.use('/login', routes);
app.use('/logout', routes);
app.use('/user', routes);
app.use('/referrals', routes);
app.use('/artists', routes);
app.use('/timelines', routes);
app.use('/commencedDates', routes);
app.use('/referralVideos', routes);
app.use('/concertNews', routes);

app.use('/api/v1', routes);

app.locals.moment = require('moment');


// User
app.use(cookieParser());

module.exports = app;