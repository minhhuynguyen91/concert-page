const redis = require("redis");
const config = require('./server')

client = redis.createClient({
  port : 18398,
  host: config.REDIS_SERVER,
  password: config.REDIS_PASSWORD
})

module.exports =  client;