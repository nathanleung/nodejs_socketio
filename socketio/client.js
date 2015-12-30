define(function(){

	function Client(timerCalc){
		this.requestNumber = 0;
		this.responseNumber = 0;
		this.timerCalc = timerCalc;
		if(this.timerCalc.requestNumber == this.requestNumber){
			this.timerCalc.startOfRequest = this.timerCalc.getCurrentTime();
		}
		this.socket = require('socket.io-client')('http://localhost:3000');
	}

	Client.prototype.getRequestHandler = function(){
		this.socket.on('connect', (function(){
			this.requestNumber++;
			if(this.timerCalc.responseNumber == this.requestNumber){
				this.timerCalc.endOfResponse = this.timerCalc.getCurrentTime();
			}
			this.timerCalc.calculateResponseTime();
			this.timerCalc.calculateTotalTime();
			console.log('socket is connected');
		}).bind(this));
		this.socket.on('value changed', (function(data){
			this.timerCalc.endOfEmit = this.timerCalc.getCurrentTime();
			this.timerCalc.calculateEmitTime();
			console.log(data);
		}).bind(this));
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