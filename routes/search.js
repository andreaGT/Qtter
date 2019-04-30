var tdb = require('../models/tuits')

module.exports = function(app){
	app.post('/search', function(req, res){
        try{
            console.log('search post');
            var sess = req.session;
            var user_id = sess.user_id;
            var wordtxt = req.body.wordtxt;
            if(user_id != ""){
                if(wordtxt != ""){
                    var re = '.*' + wordtxt+ '.*' 
                    tdb.data.createConnection(function(db, client){
                        var query = {'tweet': new RegExp(re,'i') };
                        console.log(query);
                            tdb.data.getTweetsByQuery(db, query, function(tweets){
                                // console.log(tweets);
                                res.render('search', {title: 'Qtter', tuits: tweets});
                                client.close();
                            });
                        });
                }
            }else{
                res.redirect('/');
            }
            
        }catch(err){}
    });
}