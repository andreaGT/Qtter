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

functions.verificadorTendencia = function(db, documents, hashtag, callback){
    const collection = db.collection('trends');
    query = {'hashtag':''+hashtag+''};
    console.log("QUERY: " + query);
    collection.find(query).toArray(function(err, trend) {
        assert.equal(err, null);
        console.log("Found the following hashtags");
        console.log(trend);
        console.log("cantidad: " + trend.length);

        callback(trend, hashtag);
    });
}

functions.gestionarTrend = function(db, documents, callback){
    for(var i=0; i<=documents.length-1; i++){
        console.log("Tweet: " + documents[i].tweet);
        var hashtags = documents[i].tweet.split(' ').filter(v=> v.startsWith('#'));

        for(var j=0; j<=hashtags.length-1; j++){
            console.log("trend no."+j+": "+hashtags[j]);
            this.verificadorTendencia(db, documents, hashtags[j], function(trend, hashtag){
                if(trend.length==0){ //insertar nuevo registro en trends
                    console.log("Se crea nuevo trend");
                    var fecha= new Date();
                    var fecha2 = Date.parse(fecha);

                    trend_nuevo = [{
                        'hashtag':''+hashtag+'',
                        'ocurrencias': 1,
                        'fecha_creacion': fecha2,
                        'usuario_creador': documents[0].username
                    }];

                    const collection = db.collection('trends');
                    collection.insertMany(trend_nuevo, function(err, result) {
                        assert.equal(err, null);
                        console.log("Inserted "+ result.result.n +" trends into the trends collection");
                        //callback(result);
                    });

                }else{ //hacer update al id recuperado
                    const collection = db.collection('trends');
                    console.log("Se debe actualizar el trend con id: " + trend[0]._id.toString());
                    var myQuery = {'hashtag':''+hashtag+''};
                    var ocurrencia = parseInt(trend[0].ocurrencias) + 1;
                    console.log("OCURRENCIAS: " + ocurrencia);
                    var newValues = { $set: {'ocurrencias':ocurrencia}};

                    collection.updateOne(myQuery, newValues, function(err, res){
                        if (err) throw err;
                        console.log("1 trend updated");
                    })
                }
            });
        }
    }
}

exports.data = functions;
