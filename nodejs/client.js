define(function(){
	function NodeJsClient(timerCalc){
		this.http = require('http');
		this.timeoutPeriod = 1000;
		this.requestNumber = 0;
		this.timer = setTimeout(this.setUpGetRequestHandler.bind(this), 
			this.timeoutPeriod);
		this.timerCalc = timerCalc;
	}

	NodeJsClient.prototype.setUpGetRequestHandler = function() {
		if(this.timerCalc.requestNumber == this.requestNumber){
			this.timerCalc.startOfRequest = this.timerCalc.getCurrentTime();
		}
		this.request = this.http.request({
		  'host': 'localhost',
		  'port': 8080,
		  'method': 'GET',
		  'path': '/getDict/level'
		});
		this.request.on('response', this.onGetResponse.bind(this));
		this.request.end();
	};

	NodeJsClient.prototype.onGetResponse = function(response) {
		response.on('data', function(data) {
			console.log(data.toString());
		});
		response.on('error', function(errorString){
			console.log('Error'+errorString);
		});
	   	response.on('end', (function(){
			this.requestNumber++;
			if(this.timerCalc.responseNumber == this.requestNumber){
				this.timerCalc.endOfResponse = this.timerCalc.getCurrentTime();
			}
			this.timerCalc.calculateResponseTime();
			this.timerCalc.calculateTotalTime();
			this.timer = setTimeout(this.setUpGetRequestHandler.bind(this), 
				this.timeoutPeriod);
	   	}).bind(this));
	};

	NodeJsClient.prototype.setUpPostRequest = function(){
		var request = require('request');
		request.post({url:'http://localhost:8080/setDict/level',
	 		form: {high: 2 }},
			function(error, response, body){
				if(!error && response.statusCode === 200){
					console.log(body);
				}
				if(error){
					console.log(error);
				}
			}
		);
	};

	return {
		NodeJsClient: NodeJsClient
	}
});