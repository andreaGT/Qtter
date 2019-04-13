const http = require('http');
const redis = require('redis');
const nconf = require('nconf');

// a keys.json file, or in environment variables
nconf
  .argv()
  .env()
  .file('../keys.json');

const REDISHOST = nconf.get('redisHost') || 'localhost';
const REDISPORT = nconf.get('redisPort') || 6379;

const client = redis.createClient(REDISPORT, REDISHOST);
client.on('error', err => console.error('ERR:REDIS:', err));

client.incr('visits', (err, reply) => {
    if (err) {
    console.log(err);
    res.status(500).send(err.message);
    return;
    }
});