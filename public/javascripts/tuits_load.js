//formato tuit
//<div id="tuit"><b>Dennis Higueros. </b><a href="#">@dnns16  </a><br><br><asl>ñdkasñldkasld</asl></div>
var icon_str = '<img src="/images/tuit.png" width="24" height="24" style="float: right;"/>'
var socket = io();
var count = 0;
socket.emit('get_tuits','/');
socket.emit('count_users','/');
socket.emit('count_cats','/');
socket.emit('count_tuits','/');

var interval = setInterval(function(){
	socket.emit('get_tuits','/');
	socket.emit('count_users','/');
	socket.emit('count_cats','/');
	socket.emit('count_tuits','/');
	count++;
},2000);

socket.on('get_tuits', function(msg){
	var content = "";
	//console.log(msg.length);
	for(var i=0;i<msg.length;i++){
		var res = msg[i].txt.replace('#'+msg[i].category,'<a href="/category/?id='+msg[i].category+'">#'+ msg[i].category + '</a>');
		content += '<div id="tuit">'+icon_str+' <b>' 
		+ msg[i].name + '. </b><a href="/user/?id='+msg[i].user+'">@' 
		+ msg[i].user + '</a> '+ new Date(msg[i].time)+'<hr/><br/><pre>' 
		+ res + '</pre></div>'
	}
	document.getElementById("result").innerHTML = content;
});

socket.on('count_users', function(msg){
	document.getElementById("no_usuarios").innerHTML = msg.length + " usuarios";
});

socket.on('count_cats', function(msg){
	document.getElementById("no_categorias").innerHTML = msg.length + " categorias";
});

socket.on('count_tuits', function(msg){
	document.getElementById("no_tuits").innerHTML = msg+ " tuits";
});

