// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

// //var dPort = 27017;
// var dPort = 27020;
// //var dHost = "localhost";
// var dHost = "192.168.1.4";
// var dName = "tuiter";

// var tuiterDb = {};

// tuiterDb.db = new Db(dName, new Server(dHost, dPort,{auto_reconnect: true},{}))
// tuiterDb.db.open(function(e, d){
// 	if(e) 
// 		console.log(e)
// 	else
// 		console.log("Conectado a la base de datos: " + dName);
// });

// tuiterDb.tuits = tuiterDb.db.collection('tuits');
// module.exports = tuiterDb;

// //nuevo tuitit
// tuiterDb.new = function(newData, callback){
// 	tuiterDb.tuits.insert(newData, callback(null))
// }

// tuiterDb.list = function(callback){
// 	tuiterDb.tuits.find().sort({'time':-1}).toArray(function(e, res){
// 		if(e)
// 			callback(e)
// 		else
// 			callback(null, res)
// 	})
// }

// tuiterDb.countTuits = function(callback){
// 	tuiterDb.tuits.count(function(err,res){
// 		if(err)
// 			callback(err)
// 		else
// 			callback(null, res)
// 	})
// }

// tuiterDb.userList = function(callback){
// 	tuiterDb.tuits.distinct('user',function(err,items){
// 		if(err)
// 			callback(err)
// 		else
// 			callback(null,items)
// 	})
// }

// tuiterDb.catList = function(callback){
// 	tuiterDb.tuits.distinct('category',function(err,items){
// 		if(err)
// 			callback(err)
// 		else
// 			callback(null,items)
// 	})
// }

// tuiterDb.userTuitList= function(usr,callback){
// 	tuiterDb.tuits.find({'user':usr}).toArray(function(err, tuits){
// 		if(err)
// 			callback(err)
// 		else
// 			callback(null,tuits)
// 	})
// }

// tuiterDb.catTuitList= function(cat, callback){
// 	tuiterDb.tuits.find({'category':cat}).toArray(function(err, tuits){
// 		if(err)
// 			callback(err)
// 		else
// 			callback(null,tuits)
// 	})
// }
