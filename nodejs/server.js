define(["../helpers"], function(helperFunctions){
	function NodeJsServer(timerCalc){
		this.http = require("http");
		this.url = require("url");
		this.qs = require('querystring');
		this.accuracyValue = 0;
		this.isIncreasing = true;
		this.timer = null;
		this.responseNumber = 0;
		this.stepFunctionHelper = helperFunctions.stepFunctionForAccuracyValue;
		this.timerCalc = timerCalc;
	};

	NodeJsServer.prototype.createServer = function() {
		this.server = this.http.createServer(this.requestCallback.bind(this));

		this.server.listen(8080);

		console.log("Runing on server at http://localhost:8080");
		this.timer = setInterval(this.stepFunctionForAccuracyValue.bind(this), 200);
	};

	NodeJsServer.prototype.requestCallback = function(request, response){
		//handle get request
		if(request.method == 'GET'){
			if(this.timerCalc.responseNumber == this.responseNumber){
				this.timerCalc.endOfRequest = this.timerCalc.getCurrentTime();
				this.responseNumber++;
			}
			this.timerCalc.calculateRequestTime();
			//function called when request is received
			response.writeHead(200, {'Content-Type': 'text/plain'});
			//send this response
			if(this.timerCalc.responseNumber == this.responseNumber){
				this.timerCalc.startOfResponse = this.timerCalc.getCurrentTime();
			}
			response.end(this.accuracyValue.toString());
		}
		//handle post request
		if(request.method == 'POST'){
	        console.log("POST");
	        var body = '';
			request.on('data', function(data) {
	            body += data;
	            console.log("Partial body: " + body);
		      });
			request.on('end', (function(){
				var post = this.qs.parse(body);
	            console.log("Body: " + JSON.stringify(post));
				//function called when request is received
				response.writeHead(200, {'Content-Type': 'text/plain'});
				//send this response
				response.end(JSON.stringify(post));
			}).bind(this));

		}

	};

	NodeJsServer.prototype.stepFunctionForAccuracyValue = function(){
		var stepObj = this.stepFunctionHelper(this.accuracyValue, 
			this.isIncreasing);
		this.accuracyValue = stepObj.value;
		this.isIncreasing = stepObj.isIncreasing;
	}

	return {
		NodeJsServer:NodeJsServer
	}
});