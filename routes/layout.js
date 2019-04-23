
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
                res.render('trend',{ title: 'Qtter', user_id: user_id });
            }else{
                res.redirect('/');
            }
        }catch(err){}
    });

}
