var usr = require('../models/users');

module.exports = function(app){
	
	app.get('/',function(req, res){
		res.render('login',{ title: 'Qtter'});
	});

	app.get('/register/',function(req, res){
		res.render('register',{ title: 'Qtter'});
	});

	app.post('/',function(req,res){
		var usernametxt = req.body.username;
		var passwordtxt = req.body.password;
		var query = {'username': usernametxt, 'password': passwordtxt};

		usr.data.createConnection(function(db, client){
			usr.data.getUsersByQuery(db, query, function(users){
				if(users.length > 0){
					console.log("Usuario encontrado: " + users[0].username);
					
					client.close();
					console.log("Conexion cerrada");
					res.render('home',{title: 'Qtter', user_id: usernametxt});
				}else{
					req.flash('BAD', " Username or password incorrect, try again!",'/');
				}
			});
			client.close();
		});
	})
}
