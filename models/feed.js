const redis = require('redis');
const nconf = require('nconf');

var functions = {};

createConnection = function(callback){
  //const redisHost = nconf.get('redisHost') || 'localhost';
  const redisHost = 'localhost';
  const redisPort = nconf.get('redisPort');

  const client = redis.createClient(redisPort, redisHost);
  client.on('error', err => console.error('ERR:REDIS:', err));

  callback(client);
}

functions.insertTweet = function(id_, user_id, qweet, callback){
  try {
    createConnection(function(client){
      client.hmset(user_id + id_, "username", user_id, "tweet", qweet, function (err, res) {
        if(err){
          console.log(err);
        }else{
          callback(res);
        }
        client.quit();
      });

    });
  } catch (error) {
    console.log(error);
  }
}

functions.countTweets = function(pattern, callback){
  try {
    createConnection(function(client){
      client.keys(pattern, function(err, res){
        if(err){
          console.log(err);
        }else{
          callback(res.length);
        }
        client.quit();
      });
    });
  } catch (error) {
    console.log(error);
  }
}


exports.data = functions;