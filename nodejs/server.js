function NodeJsServer(){
	this.http = require("http");
	this.url = require("url");
	this.qs = require('querystring');
	this.accuracyValue = 0;
	this.isIncreasing = true;
	this.timer = null;
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
		//function called when request is received
		response.writeHead(200, {'Content-Type': 'text/plain'});
		//send this response
		console.log(this.accuracyValue);
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
}

var nodeJsServer = new NodeJsServer();

nodeJsServer.createServer();