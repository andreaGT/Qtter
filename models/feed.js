const http = require('http');
const redis = require('redis');
const nconf = require('nconf');

// a keys.json file, or in environment variables
nconf
  .argv()
  .env()
  .file('../keys.json');

var functions = {};

functions.createConnection = function(callback){

  //const redisHost = nconf.get('redisHost') || 'localhost';
  const redisHost = 'localhost';
  const redisPort = nconf.get('redisPort') || 6379;

  const client = redis.createClient(redisPort, redisHost);
  client.on('error', err => console.error('ERR:REDIS:', err));

  callback(client);

}

functions.insertTweet = function(client, id_, user_id, qweet, callback){
  try {
    client.hmset(id_,"username", user_id, "tweet", qweet,function (err, res) {
      if(err){
        console.log(err);
      }else{
        callback(res);
        console.log('user inserted!');
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// client.incr('visits', (err, reply) => {
//     if (err) {
//     console.log(err);
//     res.status(500).send(err.message);
//     return;
//     }
// });

exports.data = functions;