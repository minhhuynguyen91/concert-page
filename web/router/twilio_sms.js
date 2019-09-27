// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const config = require('../../config/web/server');

const accountSid = config.twilio_sid;
const authToken = config.twilio_auth_token;
const client = require('twilio')(accountSid, authToken);

exports.post = function(req, res) {
  var contentBody = '';
  var contentBody = contentBody.concat("Thong tin dat ve\nVo dien: ", req.body.title + "\n", "Ten: ", req.body.name + "\n", "So ve: ", req.body.ticket+"\n","sdt: ", req.body.phone +"\n", "ma cho ngoi: ", req.body.seatCode + "\n" );
  
  client.messages
    .create({
       body: contentBody,
       from: '+1251290-8587',
       to: '+84859456912'
     })
    .then(() => {
      res.jsonp({success : true})
    })
    
    .catch((err) => {
      console.log(err);
      res.jsonp({error : true})
    });
  
};