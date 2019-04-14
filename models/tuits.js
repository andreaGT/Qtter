const http = require('http');
const nconf = require('nconf');
const assert = require('assert');

// a keys.json file, or in environment variables
nconf
  .argv()
  .env()
  .file('../keys.json');

//var dHost = nconf.get('mongoHost');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:Seguridad10@cluster0-7gpmj.gcp.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = 'twitter';

var functions = {};

functions.createConnection = function(callback){
    client.connect(err => {
        //const collection = client.db("twitter").collection("user");
        //console.dir(collection);
        // perform actions on the collection object

        const db = client.db(dbName);

        /*insertDocuments(db, function() {
            client.close();
        });*/
        console.log("Conexion creada");
        callback(db, client);
    });
}



functions.insertDocuments = function(db, documents, callback) {
    // Get the documents collection
    const collection = db.collection('user');
    // Insert some documents
    collection.insertMany(documents, function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

exports.data = functions;


// //var dPort = 27017;
// var dPort = 27020;
// //var dHost = "localhost";
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
