const http = require('http');
const nconf = require('nconf');
const assert = require('assert');

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

functions.insertTweet = function(db, documents, callback) {
    // Get the documents collection
    const collection = db.collection('bitacora_tweets');
    // Insert some documents
    collection.insertMany(documents, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted "+ result.result.n +" tweets into the collection bitacora_tweets");
        callback(result);
    });
}

functions.getTweets = function(db, callback){
    const collection = db.collection('bitacora_tweets');
    // Find some documents
    collection.find({}).toArray(function(err, tweets) {
        assert.equal(err, null);
        console.log("Found the following tweets");
        callback(tweets);
    });
}

functions.getTweetsByQuery = function(db, query, callback){
    const collection = db.collection('bitacora_tweets');
    // Find some tweets
    collection.find(query).toArray(function(err, tweets) {
        assert.equal(err, null);
        console.log("Found the following tweets");
        console.log(tweets);
        callback(tweets);
    });
}

functions.deleteTweet = function(db, query, callback){
    const collection = db.collection('bitacora_tweets');
    // Delete tweet
    collection.deleteOne(query, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the tweet with the query " + query);
        callback(result);
    });
}

exports.data = functions;
