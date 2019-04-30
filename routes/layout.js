var tdb = require('../models/tuits')

module.exports = function(app){
        
    app.get('/home',function(req, res){
        try {
            var sess = req.session;
            var user_id = sess.user_id;
            if(user_id != ""){
                res.render('home',{ title: 'Qtter', user_id: user_id });	
            }else{
                res.redirect('/');
            }
        } catch (error) {
            
        }
       
    });

    app.get('/profile/', function(req, res){
        try{
            var sess = req.session;
            var user_id = sess.user_id;
            if(user_id != ""){
                res.render('profile',{ title: 'Qtter', user_id: user_id });
            }else{
                res.redirect('/');
            }
            
        }catch(err){}
    });

    app.get('/trend/', function(req, res){
		try{
            var sess = req.session;
            var user_id = sess.user_id;
            if(user_id != ""){
                var re = '.*';
                if(req.query.id != undefined){
                    console.log("entre aca");
                    var id = req.query.id
                    console.log(req.query);
                    re = '.*#' + id + '.*'  
                }
                tdb.data.createConnection(function(db, client){
                var query = {'tweet': new RegExp(re,'i') };
                console.log(query);
                    tdb.data.getTweetsByQuery(db, query, function(tweets){
                        // console.log(tweets);
                        res.render('trend', {title: 'Qtter', tuits: tweets});
                        client.close();
                    });
                });
            }else{
                res.redirect('/');
            }
        }catch(err){}
    });
    
    app.get('/search/', function(req, res){
        try{
            var sess = req.session;
            var user_id = sess.user_id;
            if(user_id != ""){
                var re = '.*';
                tdb.data.createConnection(function(db, client){
                var query = {'tweet': new RegExp(re,'i') };
                console.log(query);
                    tdb.data.getTweetsByQuery(db, query, function(tweets){
                        res.render('search', {title: 'Qtter', tuits: tweets});
                        client.close();
                    });
                });
            }else{
                res.redirect('/');
            }
        }catch(err){}
    });
}
