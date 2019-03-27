
/**
 * Module dependencies.
 */

var express = require('express')
	,routes = require('./routes');

var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var tdb = require('./models/tuits.js')

//var app = module.exports = express.createServer();
//var io = require('socket.io')(http);
// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

//app.get('/', routes.index);

require('./routes')(app);

/*app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});*/

io.on('connection', function(socket){
  socket.on('get_tuits', function(msg){
	  tdb.list(function(e, tuits){
		  io.emit('get_tuits', tuits);
	  });
  });
  socket.on('get_user_tuits', function(msg){
	  tdb.userTuitList(msg,function(e, tuits){
		  io.emit('get_user_tuits', tuits);
	  });
  });
  socket.on('count_users', function(msg){
	  tdb.userList(function(e,res){
		  io.emit('count_users', res);
	  });
  });
  socket.on('count_cats', function(msg){
	  tdb.catList(function(e,res){
		  io.emit('count_cats', res);
	  });
  });
  socket.on('count_tuits', function(msg){
	  tdb.countTuits(function(e,res){
		  io.emit('count_tuits', res);
	  });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
