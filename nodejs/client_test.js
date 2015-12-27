// var requirejs = require('requirejs');

requirejs(['http'], function(http){

	function NodeJsClient(){

		//make the request object
		var request=http.request({
		  'host': 'localhost',
		  'port': 80,
		  'path': '/',
		  'method': 'GET'
		});

		//assign callbacks
		request.on('response', function(response) {
		   console.log('Response status code:'+response.statusCode);

		   response.on('data', function(data) {
		     console.log('Body: '+data);
		   });
		});
	}
	NodeJsClient.prototype.render = function(parent) {
		element = document.createElement("div");
		element.innerHTML = "Hello World";
		parent.appendChild(element);
	};
	NodeJsClient.prototype.refresh = function(first_argument) {
		// body...
	};

	return {
		NodeJsClient: NodeJsClient
	}
});