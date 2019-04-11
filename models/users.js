// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

// var dPort = 27017;
// var dHost = "localhost";
// var dName = "tuiter";

// var tuiterDb = {};

// tuiterDb.db = new Db(dName, new Server(dHost, dPort,{auto_reconnect: true},{}))
// tuiterDb.db.open(function(e, d){
// 	if(e) 
// 		console.log(e)
// 	else
// 		console.log("Conectado a la base de datos: " + dName);
// });

// tuiterDb.users = tuiterDb.db.collection('tuits');
// module.exports = tuiterDb;

// //nuevo usuario
// tuiterDb.new = function(newData, callback){
// 	tuiterDb.users.insert(newData, callback(null))
// }

// tuiterDb.list = function(callback){
// 	tuiterDb.users.find().toArray(function(e, res){
// 		if(e)
// 			callback(e)
// 		else
// 			callback(null, res)
// 	})
// }
