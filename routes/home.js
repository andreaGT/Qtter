
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};*/

var tdb = require('../models/tuits')

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
	
	app.post('/home',function(req, res){
		tdb.new({name: req.param('name'), email: req.param('email')}, function(e){
			tdb.list(function(e, usrs){
				res.render('home',{ title: 'Lista de usuarios', users: usrs });
			})
		})	
	});

	app.get('/profile/', function(req, res){
		try{
			res.render('profile', {title: 'Qtter '});
		}catch(err){}
	});

	app.get('/trend/', function(req, res){
		try{
			res.render('trend', {title: 'Qtter '});
		}catch(err){}
	});
}
