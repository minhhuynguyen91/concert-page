const jwt = require('express-jwt');

const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  if(authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};


// POST login route (optional, everyone has access)
// exports.post = function('/login', auth.optional, (req, res, next) => {
//   const { body: { user } } = req;

//   if(!user.email) {
//     return res.status(422).json({(
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }

//   return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//     if(err) {
//       return next(err);
//     }

//     if(passportUser) {
//       const user = passportUser;
//       user.token = passportUser.generateJWT();

//       return res.json({ user: user.toAuthJSON() });
//     }

//     return status(400).info;
//   })(req, res, next);
// });

exports.create = function(req, res, next) {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors : {
        email: 'is required'
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors : {
        password: 'is required'
      },
    });
  }

  const finalUser = new Users(user)
  finalUser.setPassword(user.password);
  return finalUser.save()
    .then(() => res.json({user: finalUser.toAuthJSON()}));
}

exports.post = function(req, res, next) {
  const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors : {
        email: 'is required'
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors : {
        password: 'is required'
      },
    });
  }

  return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({user: user.toAuthJSON() });
    }

    return status(400).info
  })(req, res, next);  
}

//GET current route (required, only authenticated users have access)
// exports.get = function('/login', auth.required, (req, res, next) => {
//   const { payload: { id } } = req;

//   return Users.findById(id)
//     .then((user) => {
//       if(!user) {
//         return res.sendStatus(400);
//       }

//       return res.json({ user: user.toAuthJSON() });
//     });
// });

module.exports = auth;