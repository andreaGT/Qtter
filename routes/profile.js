
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
	
	app.get('/',function(req, res){
		try{
			
		}catch(err){}
		res.render('home',{ title: 'Qtter' });
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
