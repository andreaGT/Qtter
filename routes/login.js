var usr = require('../models/users');
var rdb = require('../models/feed.js');
var tdb = require('../models/tuits.js');

module.exports = function(app){
	
	app.get('/',function(req, res){
		var sess = req.session;
        sess.user_id = "";
		res.render('login',{ title: 'Qtter'});
	});

	app.post('/',function(req,res){
		var usernametxt = req.body.username;
		var passwordtxt = req.body.password;
		var query = {'username': usernametxt, 'password': passwordtxt};
		var sess = req.session;

		usr.data.createConnection(function(db, client){
			usr.data.getUsersByQuery(db, query, function(users){
				if(users.length > 0){
					console.log("Usuario encontrado: " + users[0].username);
					sess.user_id = usernametxt;
					var totalqs = 0;
					rdb.data.countTweets('*'+usernametxt+'*',function(total){
						totalqs = total;
					});
					tdb.data.getTweets(db, function(tweets){
						res.render('home',{title: 'Qtter', user_id: usernametxt, tuits: tweets, totalqs: totalqs});
						client.close();
					});
				}else{
					req.flash('BAD', " Username or password incorrect, try again!",'/');
					client.close();
				}
			});
		});
	})
}
