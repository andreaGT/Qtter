var socket = io();
var username = document.getElementsByName("user_id_content");
var count = 0;
var icon_str = '<img src="/images/tuit.png" width="24" height="24" style="float: right;"/>'
// socket.emit('count_users','/');
// socket.emit('count_cats','/');

setTimeout(
	function(){
		if(username[0] != null){
			socket.emit('count_tuits', username[0].innerHTML);
			socket.emit('get_tuits','/');
		}
}, 4000);

var interval = setInterval(function(){
	socket.emit('get_tuits','/');

	if(username != null){
		socket.emit('count_tuits', username[0].innerHTML);
	}
	count++;
},60000);

socket.on('get_tuits', function(tweets){
	var content = "";
	//console.log(msg.length);
	for(var i=0;i<tweets.length;i++){
		//var res = tweets[i].txt.replace('#'++,'<a href="/trend/?id='+tweets[i].category+'">#'+ tweets[i].category + '</a>');
		content += '<div id="tuit">'+icon_str+' <b>' 
		+ tweets[i].username + '. </b><a href="/user?id='+tweets[i].username+'">@' 
		+ tweets[i].username + '</a> '+ new Date(tweets[i].fecha_creacion)+'<hr/><br/><pre>' 
		+ tweets[i].tweet + '</pre></div>'
	}
	console.log(content);
	document.getElementById("result").innerHTML = content;
});

socket.on('count_tuits', function(num){
	document.getElementById("no_qweets").innerHTML = num;
});

