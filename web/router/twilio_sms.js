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
  contentBody = contentBody.replace(/[^\x00-\x7F]/g, "");
  //console.log(contentBody);
  // res.jsonp({
  //   success : true,
  //   message: 'Chúng tôi đã nhận được phản hồi từ quý khách, chúng tôi sẽ gọi điện xác nhận trong thời gian sớm nhất'
  // });
  
  client.messages
    .create({
        body: contentBody,
        from: '+1251290-8587',
        to: '+84859456912'
       //to: '+84908440968'
     })
    .then(() => {
      res.jsonp({
        success : true,
        message: 'Chúng tôi đã nhận được phản hồi từ quý khách, chúng tôi sẽ gọi điện xác nhận trong thời gian sớm nhất'
      })
    })
    
    .catch((err) => {
      console.log(err);
      res.jsonp({
        error : true,
        message: 'Có lỗi từ hệ thống SMS. Xin quý khách liên hệ fanpage facebook của chúng tôi.'
      })
    });
  
};