var requirejs = require('requirejs');
var server = requirejs('server.js');
var client = requirejs('client.js');
var timer = requirejs('../timer.js');
var helperFunctions = requirejs('../helpers');
var timerCalc = new timer.Timer();
var timerCalc = new timer.Timer();
var socketServer = new server.SocketIOServer(timerCalc);
socketServer.startServer();

var client = new client.Client(timerCalc);
client.getRequestHandler();