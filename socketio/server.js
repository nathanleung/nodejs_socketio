function SocketIOServer(){
	this.app = require('express')();
	this.http = require('http').Server(this.app);
	this.io = require('socket.io')(this.http);
	this.accuracyValue = 0;
	this.isIncreasing = true;
}

SocketIOServer.prototype.handleGetRequest = function() {
	//handle get request
	this.app.get('/', function(request, response){
	  response.send("Hello World");
	});
};

SocketIOServer.prototype.handleSocketConnection = function(){
	this.io.on('connection', this.socketConnectionCallback.bind(this));
}

SocketIOServer.prototype.socketConnectionCallback = function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('modify data', function(msg){
		console.log('message: '+msg);
	});
	//only if it si different
	this.io.emit('value changed', this.accuracyValue);
}
SocketIOServer.prototype.stepFunctionForAccuracyValue = function(){
	if(this.isIncreasing){
		this.accuracyValue ++;
	}else{
		this.accuracyValue --;
	}
	if(this.accuracyValue === 20){
		this.isIncreasing = false;
	}
	if(this.accuracyValue === 0){
		this.isIncreasing = true;
	}
	//only if it is different
	this.io.emit('value changed', this.accuracyValue);
}

var socketServer = new SocketIOServer();
socketServer.handleGetRequest();
socketServer.handleSocketConnection();
socketServer.http.listen(3000, function(){
	console.log("listening on *:3000");
});
socketServer.timer = setInterval(socketServer.stepFunctionForAccuracyValue.bind(socketServer), 200);