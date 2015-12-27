var http = require("http");
var url = require("url");
var qs = require('querystring');
var dict = {};
dict.level = {high: 2};
var server = http.createServer(function(request, response){
	var requestUrl = url.parse(request.url, true);
	console.log(requestUrl.pathname);
	if(request.method == 'GET'){
		//function called when request is received
		response.writeHead(200, {'Content-Type': 'text/plain'});
		//send this response
		response.end(JSON.stringify(dict));
	}
	if(request.method == 'POST'){
        console.log("POST");
        var body = '';
		request.on('data', function(data) {
            body += data;
            console.log("Partial body: " + body);
	      });
		request.on('end', function(){
			var post = qs.parse(body);
            console.log("Body: " + JSON.stringify(post));
		});
			//function called when request is received
			response.writeHead(200, {'Content-Type': 'text/plain'});
			//send this response
			response.end(JSON.stringify(dict));

	}
});

server.listen(8080);

console.log("Runing on server at http://localhost:8080")