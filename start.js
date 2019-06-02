const config = require('./config/web/server');
const mongoose = require('mongoose');


mongoose.connect(config.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${config.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


require('./models/concert');


const app = require('./app');

const server = app.listen(3000, () => {
  console.log("Server is running");
});
