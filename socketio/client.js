var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
	console.log('socket is connected');
});
socket.on('dict', function(data){
	console.log('data' +data);
});
socket.on('disconnect', function(){
	console.log('scoket is disconnected');
});
socket.emit('modify data', 2);