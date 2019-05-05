var socket = io();
var count = 0;
//socket.emit('get_trends','/');
//socket.emit('count_tuits','/');
// socket.emit('count_users','/');
// socket.emit('count_cats','/');

// setTimeout(
//     function(){
//         socket.emit('get_trends','/');
// }, 4000);

var interval = setInterval(function(){
	socket.emit('get_trends','/');

	if(username != null){
		socket.emit('count_tuits', username[0].innerHTML);
	}
	count++;
},40000);

socket.on('get_trends', function(trends){
    var content = "";
    var flag = 0;
    //console.log(msg.length);
    content+= '<div class="row">'
	for(var i=0;i<trends.length;i++){
        var trend =  trends[i].hashtag;
        var trendword = trend.replace('#','');
        if (flag == 0){
            content += '<div class="col-lg-6"><ul class="list-unstyled mb-0">'
        }
        content += '<li></li><a href="/trend?id='+trendword+'">' 
        + trend+ '</a>' 
        
        flag++;
        if (flag == 3){
            content += '</ul></div>'
            flag = 0
        }

    }
	content+= '</div>'				
	console.log(content);
	document.getElementById("trends").innerHTML = content;
});

