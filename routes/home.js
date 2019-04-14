
/*
 * GET home page.
 */

/*exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};*/

var tdb = require('../models/tuits');

//usuarios a insertar...
var documents = [{username : 'uno', password: '9b547809b2e2c7565252ca58c11ce74229316366', 'fecha_creacion': '14/04/19', nombres: 'uno1'},
	{username : 'dos', password: '9b547809b2e2c7565252ca58c11ce74229316366', 'fecha_creacion': '14/04/19', nombres: 'dos2'},
	{username : 'tres', password: '9b547809b2e2c7565252ca58c11ce74229316366', 'fecha_creacion': '14/04/19', nombres: 'tres3'}];

//se llama a la function createConnection en cada metodo, dicha funcion retorna db y client desde tuits.js
tdb.data.createConnection(function(db, client){
	tdb.data.insertDocuments(db, documents, function(result){
		console.log("Fin insercion documento");
		//console.log("Resultado n" + result.result.n);

		//ops retorna los documentos insertados junto al id generado por mongodb
		for(var i = 0; i <= result.ops.length-1; i++){
			console.log("username: " + result.ops[i].username + ", id: " + result.ops[i]._id.toString());
		}
		//console.dir(result.ops);
	});
	client.close();
	console.log("Conexion cerrada");
});


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
