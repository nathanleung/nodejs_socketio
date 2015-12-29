var http=require('http');

for(var i = 0; i< 10; i++){

//make the request object
var request = http.request({
  'host': 'localhost',
  'port': 8080,
  'method': 'GET',
  'path': '/getDict/level'
});
var time = new Date();
console.log(time.getUTCSeconds() + ":" + time.getUTCMilliseconds());
//read request
//assign callbacks
request.on('response', function(response) {
   console.log('Response status code:'+response.statusCode);

   response.on('data', function(data) {
     console.log('Body: '+data);
   });
   response.on('error', function(errorString){
   	console.log('Error'+errorString);
   });
   	response.on('end', function(){
   		console.log('ended');
   		time = new Date();
console.log(time.getUTCSeconds() + ":" + time.getUTCMilliseconds());
   	});
});

request.end();
}
//post request
// var request = require('request');
// request.post({url:'http://localhost:8080/setDict/level',
// 	 form: {high: 2 }},
// 	function(error, response, body){
// 		if(!error && response.statusCode === 200){
// 			console.log(body);
// 		}
// 		if(error){
// 			console.log(error);
// 		}
// 	});