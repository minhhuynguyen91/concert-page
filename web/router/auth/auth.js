const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
var User = mongoose.model('User');
const config = require('../../../config/web/server');

exports.authorization = function(req, res, next) {
  //get the token from the header if present
  const token = req.session.accessToken;
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.myprivatekey);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};


exports.post = function(req, res) {
  
  User.authenticate(req.body.email, req.body.password, function(err, user) {
    if (err || !user) {
      var err = new Error('Wrong email or password.');
      console.log(err);
      return res.render('authenticate/login');
    
    } else {
      const token = user.generateAuthToken();
      req.session.userId = user._id;
      req.session.accessToken = token;
      
      return res.redirect('/') ;
    }
  });
};

exports.get = function(req, res) {
  res.render('authenticate/login', {session: req.session});
};

exports.logout = function(req, res) {
  if (req.session) {
	  req.session.destroy(function(err) {
	    if(err) {
		  res.send('Something wrong happened when logging out!');
	    } else {
		  res.redirect('/');
		}
	  });
  }
};