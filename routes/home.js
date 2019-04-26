var tdb = require('../models/tuits');
var rdb = require('../models/feed.js');
var utilities = require('../utilities/essential.js');


// TWEETS

/*tdb.data.createConnection(function(db, client){
	tdb.data.getTweets(db, function(tweets){
		//console.dir(tweets);

		for(var i = 0; i<=tweets.length-1; i++){
			console.log(tweets[i].tweet);
		}
	});
	client.close();
	console.log("Conexión cerrada");
});*/

var query = {'username': 'andrea'};

/*tdb.data.createConnection(function(db, client){
	tdb.data.getTweetsByQuery(db, query, function(tweets){
		for(var i = 0; i<=tweets.length-1; i++){
			console.log("Tweet encontrado: " + tweets[i].tweet);
		}
	});
	client.close();
});*/

query = {'username': 'chapin'};
/*tdb.data.createConnection(function(db, client){
	tdb.data.deleteTweet(db, query, function(result){
		console.log("Deleted tweets, cantidad: " + result.result.n);
	});
});*/

function getCategory(text){
	var cat = text.split("#")[1].split(" ")[0];
	return cat;
}

module.exports = function(app){

	app.get('/home',function(req, res){
		try{
			tdb.new(
				{
					user: req.query.usr, 
					name: req.query.nom, 
					txt:  req.query.txt,
					category: getCategory(req.query.txt),
					time: new Date().getTime()
				},
				function(e){}
				);
		}catch(err){}
		res.render('home',{ title: 'Lista de usuarios', script: '/javascripts/tuits_load.js' });
	});
	
	app.get('/user/', function(req, res){
		try{
			console.log(req.query.id);
			tdb.userTuitList(req.query.id, function(e, usrs){
				console.log(usrs);
				res.render('users', {title: 'Tuits de ' + req.query.id,title2:'Cantidad de tuits: ' + usrs.length, tuits: usrs});
			});
		}catch(err){}
	});
	
	app.get('/category/', function(req, res){
		try{
			console.log(req.query.id);
			tdb.catTuitList(req.query.id, function(e, usrs){
				console.log(usrs);
				res.render('category', {title: 'Tuits categoría ' + req.query.id,title2:'Cantidad de tuits: ' + usrs.length,tuits: usrs});
			});
		}catch(err){}
	});
	
	

	app.post('/qweet/',function(req, res){
		var sess = req.session;
		var user_id = sess.user_id;
		var qweetxt = req.body.qweetxt;
		var date = utilities.data.getCurrentDate();
		var id_ = "";

		try {
			tdb.data.createConnection(function(db, client){
				var qweet = [{username : user_id, tweet: qweetxt, 'fecha_creacion': date}];
				tdb.data.insertTweet(db, qweet, function(result){
					console.log("Fin insercion tweet");
					//ops retorna los documentos insertados junto al id generado por mongodb
					id_ = result.ops[0]._id.toString();
					client.close();
					console.log("Conexion cerrada");

					rdb.data.insertTweet(id_, user_id, qweetxt, function(result){
						console.log(result+": tweet inserted");
					});

					req.flash('GOOD', " Qweet posted! :D",'/home');

				});
			});

			tdb.data.createConnection(function(db, client){
				var qweet = [{username : user_id, tweet: qweetxt, 'fecha_creacion': date}];
				tdb.data.gestionarTrend(db, qweet, function(){
					console.log("Fin insercion trend");
					client.close();
					console.log("Conexion cerrada");
				});
			});

		} catch (error) {
			req.flash('BAD', " Server error! :(",'/home');
		}	
	});

}
