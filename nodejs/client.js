var http=require('http');

//make the request object
var request = http.request({
  'host': 'localhost',
  'port': 8080,
  'method': 'GET',
  'path': '/getDict/level'
});

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
   	});
});

request.end();

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
	});
// //Load the request module
// var request = require('request');

// //Lets configure and request
// request({
//     url: 'https://localhost:8080/setDict/level', //URL to hit
//     // qs: {from: 'blog example', time: +new Date()}, //Query string data
//     method: 'POST',
//     //Lets post the following key/values as form
//     // json: {
//     //     field1: 'data',
//     //     field2: 'data'
//     // }
// }, function(error, response, body){
//     if(error) {
//         console.log('error2'+error);
//     } else {
//         console.log(response.statusCode, body);
// }
// });
console.log('running client');