
/**
 * Module dependencies.
 */
var flash = require('express-flash-notification');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var express = require('express');

var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tdb = require('./models/tuits.js')

//variables routes
var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/home');
var profile = require('./routes/profile');
var trend = require('./routes/trend');

// Configuration
const PORT = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', saveUninitialized: true, resave: true}));

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
home(app);
profile(app);
trend(app);


// io.on('connection', function(socket){
//   socket.on('get_tuits', function(msg){
// 	  tdb.list(function(e, tuits){
// 		  io.emit('get_tuits', tuits);
// 	  });
//   });
//   socket.on('get_user_tuits', function(msg){
// 	  tdb.userTuitList(msg,function(e, tuits){
// 		  io.emit('get_user_tuits', tuits);
// 	  });
//   });
//   socket.on('count_users', function(msg){
// 	  tdb.userList(function(e,res){
// 		  io.emit('count_users', res);
// 	  });
//   });
//   socket.on('count_cats', function(msg){
// 	  tdb.catList(function(e,res){
// 		  io.emit('count_cats', res);
// 	  });
//   });
//   socket.on('count_tuits', function(msg){
// 	  tdb.countTuits(function(e,res){
// 		  io.emit('count_tuits', res);
// 	  });
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
