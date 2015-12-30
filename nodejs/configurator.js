var requirejs = require('requirejs');
var server = requirejs('server.js');
var client = requirejs('client.js');
var timer = requirejs('../timer.js');
var helperFunctions = requirejs('../helpers');
var timerCalc = new timer.Timer();
var nodeJsServer = new server.NodeJsServer(timerCalc);
nodeJsServer.createServer();

var nodeClient = new client.NodeJsClient(timerCalc);