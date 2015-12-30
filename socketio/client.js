define(function(){

	function Client(){
		this.socket = require('socket.io-client')('http://localhost:3000');
	}

	Client.prototype.getRequestHandler = function(){
		this.socket.on('connect', function(){
			console.log('socket is connected');
		});
		this.socket.on('value changed', function(data){
			console.log(data);
		});
		this.socket.on('disconnect', function(){
			console.log('scoket is disconnected');
		});
	};

	Client.prototype.postRequest = function() {
		this.socket.emit('modify data', 2);
	};

	return {
		Client:Client
	}
});