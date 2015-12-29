var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dict = {};
dict.level = {high: 2};
//handle get request
app.get('/', function(requ, res){
	res.send("Hello World");
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('modify data', function(msg){
		console.log('message: '+msg);
	});
	//only if it si different
	io.emit('dict', JSON.stringify(dict));
})

http.listen(3000, function(){
	console.log("listening on *:3000");
});