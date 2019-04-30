
/**
 * Module dependencies.
 */
var flash = require('express-flash-notification');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemcachedStore = require('connect-memjs')(session);
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var express = require('express');
var http = require('http');

var nconf = require('nconf');

// Environment variables are defined in app.yaml.
let MEMCACHE_URL = process.env.MEMCACHE_URL || '127.0.0.1:11211';

if (process.env.USE_GAE_MEMCACHE) {
  MEMCACHE_URL = `${process.env.GAE_MEMCACHE_HOST}:${process.env.GAE_MEMCACHE_PORT}`;
}

var app = express()
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var tdb = require('./models/tuits.js');
var rdb = require('./models/feed.js');

//variables routes
var login = require('./routes/login');
var register = require('./routes/register');
var layout = require('./routes/layout');
var home = require('./routes/home');
var profile = require('./routes/profile');
var trend = require('./routes/trend');
var searchq = require('./routes/search');

// Configuration
const PORT = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', 
                  saveUninitialized: true, 
                  resave: true, 
                  store: new MemcachedStore({servers: [MEMCACHE_URL]})
                }));

//custom configuration for flash notifications
const flashNotificationOptions = {
  beforeSingleRender: function(item, callback) {
    if (item.type) {
      switch(item.type) {
        case 'GOOD':
          item.type = 'Success';
          item.alertClass = 'alert-success';
          break;
        case 'OK':
          item.type = 'Info';
          item.alertClass = 'alert-info';
          break;
        case 'BAD':
          item.type = 'Error';
          item.alertClass = 'alert-danger';
          break;
      }
    }
    callback(null, item);
  }
};
app.use(flash(app, flashNotificationOptions));

app.use(errorHandler({ dumpExceptions: true, showStack: true }));

//Define routes
login(app);
register(app);
layout(app);
home(app);
profile(app);
trend(app);
searchq(app);

//load configurations, a keys.json file, or in environment variables
nconf.argv()
    .env()
    .file('./utilities/keys.json');


io.on('connection', function(socket){
  console.log('socket io client is connected');
  socket.on('count_tuits', function(msg){
	  rdb.data.countTweets('*'+msg+'*',function(res){
		  io.emit('count_tuits', res);
	  });
  });
  socket.on('get_tuits', function(msg){
    tdb.data.createConnection(function(db, client){
      tdb.data.getTweets(db, function(tweets){
        io.emit('get_tuits', tweets);
        client.close();
      });
    });
  });
  socket.on('get_tuitsByUser', function(msg){
    tdb.data.createConnection(function(db, client){
      var query = {'username': msg};
      tdb.data.getTweetsByQuery(db, query, function(tweets){
        io.emit('get_tuitsByUser', tweets);
        client.close();
      });
    });
  });
  socket.on('get_trends', function(msg){
    tdb.data.createConnection(function(db, client){
      tdb.data.getTrends(db, function(trends){
        io.emit('get_trends', trends);
        client.close();
      });
    });
  });
  // socket.on('count_cats', function(msg){
	//   tdb.catList(function(e,res){
	// 	  io.emit('count_cats', res);
	//   });
  // });

});

// Start the server
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});