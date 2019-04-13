
/**
 * Module dependencies.
 */
var session = require('express-session');
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
var home = require('./routes/home');
//var app = module.exports = express.createServer();
//var io = require('socket.io')(http);
// Configuration
const PORT = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Routes

//app.get('/', routes.index);

//Define routes
login(app);
home(app);

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
