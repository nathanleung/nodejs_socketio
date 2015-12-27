requirejs(['client'], function(clientLib){
	var client = new clientLib.NodeJsClient();
	element = document.getElementById("main_div");
	client.render(element);
});