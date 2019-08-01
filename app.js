const express = require('express');
const app = express();
const routes = require('./web/router/index');
const bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');

var cookieParser = require('cookie-parser');
const session = require('express-session');


app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'pug');

// Js frontend
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/umd'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/moment', express.static(__dirname + '/node_modules/moment'));
app.use('/tempusdominus', express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build'));
app.use('/simplemde', express.static(__dirname + '/node_modules/simplemde/dist'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/\@fortawesome/fontawesome-free'));

app.use(express.static(__dirname, { dotfiles: 'allow' } ));


// Stylesheet
app.use(express.static(path.join(__dirname, '/public')));

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
// app.use('/concerts/new', routes);
// app.use('/concerts/:id', routes);
// app.use('/concerts/:id/edit', routes);

app.use('/login', routes);
app.use('/logout', routes);
app.use('/user', routes);
app.use('/referrals', routes);
app.use('/artists', routes);
app.use('/timelines', routes);
app.use('/commencedDates', routes);

app.get('/.well-known/acme-challenge/:content', function(req, res) {
  res.send('yaptj5lNUDerIVYZmNRMd_b6f5GDpEC6TTwFFxA0UBU');
})


app.locals.moment = require('moment');

// User
app.use(cookieParser());

module.exports = app;
