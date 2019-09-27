// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const config = require('../../config/web/server');

const accountSid = config.twilio_sid;
const authToken = config.twilio_auth_token;
const client = require('twilio')(accountSid, authToken);

exports.post = function(req, res) {
  console.log("Hello");
  res.jsonp({error : true})
  // client.messages
  //   .create({
  //      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //      from: '+1251290-8587',
  //      to: '+84859456912'
  //    })
  //   .then(message => console.log(message.sid))
    
  //   .catch((err) => {
  //     console.log(err);
  //   });
  
};