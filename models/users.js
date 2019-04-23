const http = require('http');
const assert = require('assert');
const nconf = require('nconf');

var functions = {};

functions.createConnection = function(callback){
    const dbUsr = nconf.get('mongodbusr');
    const dbHost = nconf.get('mongoHost');
    const dbPass = nconf.get('mongoPw');
    const dbName = nconf.get('mongodbtw');

    const MongoClient = require('mongodb').MongoClient;
    const uri = `mongodb+srv://${dbUsr}:${dbPass}@${dbHost}/test?retryWrites=true`;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    
    client.connect(err => {
        const db = client.db(dbName);
        console.log("Conexion creada");
        callback(db, client);
    });
}

functions.insertUser = function(db, documents, callback) {
    // Get the documents collection
    const collection = db.collection('user');
    // Insert some documents
    collection.insertMany(documents, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted user into the collection users");
        callback(result);
    });
}

functions.getUsers = function(db, callback){
    const collection = db.collection('user');
    // Find some documents
    collection.find({}).toArray(function(err, users) {
        assert.equal(err, null);
        console.log("Found the following users");
        callback(users);
    });
}

functions.getUsersByQuery = function(db, query, callback){
    const collection = db.collection('user');
    // Find some documents
    collection.find(query).toArray(function(err, users) {
        assert.equal(err, null);
        console.log("Found the following users");
        console.log(users);
        callback(users);
    });
}

functions.deleteUser = function(db, query, callback){
    const collection = db.collection('user');
    // Delete user
    collection.deleteOne(query, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the user with the query " + query);
        callback(result);
    });
}

functions.closeConnection = function(){
    client.close();
}

exports.data = functions;
