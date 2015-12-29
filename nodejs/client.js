function NodeJsClient(){
	this.http = require('http');
}

NodeJsClient.prototype.setUpGetRequestHandler = function() {
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
   	response.on('end', function(){
   	});
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
}

var nodeClient = new NodeJsClient();
var timer = setInterval(nodeClient.setUpGetRequestHandler.bind(nodeClient), 1000);