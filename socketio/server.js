define(["../helpers"], function(helpersLib){

	function SocketIOServer(timerCalc){
		this.app = require('express')();
		this.http = require('http').Server(this.app);
		this.io = require('socket.io')(this.http);
		this.accuracyValue = 0;
		this.isIncreasing = true;
		this.stepFunctionHelper = helpersLib.stepFunctionForAccuracyValue;
		this.timerCalc = timerCalc;
		this.requestNumber = 0;
		this.responseNumber = 0;
	};

	SocketIOServer.prototype.startServer = function(){
		this.handleGetRequest();
		this.handleSocketConnection();
		this.http.listen(3000, function(){
			console.log("listening on *:3000");
		});
		this.timer = setInterval(this.stepFunctionForAccuracyValue.bind(this), 200);
	};

	SocketIOServer.prototype.handleGetRequest = function() {
		//handle get request
		this.app.get('/', function(request, response){
		  response.send("Hello World");
		});
	};

	SocketIOServer.prototype.handleSocketConnection = function(){
		this.io.on('connection', this.socketConnectionCallback.bind(this));
	};

	SocketIOServer.prototype.socketConnectionCallback = function(socket){
		if(this.timerCalc.responseNumber == this.responseNumber){
			this.timerCalc.endOfRequest = this.timerCalc.getCurrentTime();
			this.responseNumber++;
		}
		console.log('a user connected');
		this.timerCalc.calculateRequestTime();
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
		socket.on('modify data', function(msg){
			console.log('message: '+msg);
		});
		//send this response
		if(this.timerCalc.responseNumber == this.responseNumber){
			this.timerCalc.startOfResponse = this.timerCalc.getCurrentTime();
		}
		//only if it si different
		this.io.emit('value changed', this.accuracyValue);
	};

	SocketIOServer.prototype.stepFunctionForAccuracyValue = function(){
		var stepObj = this.stepFunctionHelper(this.accuracyValue, 
			this.isIncreasing);
		this.accuracyValue = stepObj.value;
		this.isIncreasing = stepObj.isIncreasing;
		this.timerCalc.startOfEmit = this.timerCalc.getCurrentTime();
		//only if it is different
		this.io.emit('value changed', this.accuracyValue);
	};

	return {
		SocketIOServer:SocketIOServer
	}
});