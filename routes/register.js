var usr = require('../models/users');
var utilities = require('../utilities/essential');

/*usr.data.createConnection(function(db, client){
	usr.data.getUsers(db, function(users){
		//console.dir(users);

		for(var i = 0; i<=users.length-1; i++){
			console.log(users[i].username);
		}
	});
	client.close();
	console.log("Conexión cerrada");
});*/

var query = {'username': 'andrea'};

/*usr.data.createConnection(function(db, client){
	usr.data.getUsersByQuery(db, query, function(users){
		for(var i = 0; i<=users.length-1; i++){
			console.log("Usuario encontrado: " + users[i].username);
		}
	});
	client.close();
});*/

query = {'username': 'master2'};
/*usr.data.createConnection(function(db, client){
	usr.data.deleteUser(db, query, function(result){
		console.log("Deleted users, cantidad: " + result.result.n);
	});
});*/

module.exports = function(app){
	
	app.get('/',function(req, res){
		res.render('login',{ title: 'Qtter'});
	});

	app.post('/register/',function(req,res){
        var usernametxt = req.body.username;
        var nametxt = req.body.name;
        var passwordtxt = req.body.password;
        var date = utilities.data.getCurrentDate();
        var newUsr = [{username : usernametxt, password: passwordtxt, 'fecha_creacion': date, nombres: nametxt}];
        //console.log(newUsr);
        try {
            var query = {'username': usernametxt};
            usr.data.createConnection(function(db, client){
                //verify if username exist
                usr.data.getUsersByQuery(db, query, function(users){
                    //insert or notify if the user already exists
                    if(users.length > 0){
                        console.log("Usuario encontrado: " + users[0].username);
                        req.flash('OK', " Username already exists! try with another one :)",'/register');
                        client.close();
                        console.log("Conexion cerrada");
                    }else{
                        console.log('inserting...');
                        // insert into mongo users
                        usr.data.insertUser(db, newUsr, function(result){
                            console.log("Fin insercion documento");
                            //ops retorna los documentos insertados junto al id generado por mongodb
                            for(var i = 0; i <= result.ops.length-1; i++){
                                console.log("username: " + result.ops[i].username + ", id: " + result.ops[i]._id.toString());
                            }
                            client.close();
                            console.log("Conexion cerrada al insertar usuario");
                        });
                        req.flash('GOOD', " Yaas! your registration was a success! now you can Sing in :D", '/');
                    }
                });
            });
        } catch (error) {
           console.log(error);
        }
	});
}