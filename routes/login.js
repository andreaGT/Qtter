module.exports = function(app){
	
	app.get('/',function(req, res){
		res.render('login',{ title: 'Qtter'});
	});

	app.get('/register/',function(req, res){
		res.render('register',{ title: 'Qtter'});
	});

	app.post('/',function(req,res){
		res.render('home',{title: 'Qtter', user_id: 'Andrea'});
	})
}
