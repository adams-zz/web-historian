var http = require("http");
var handler = require("./request-handler");

var requestListener = function(request, response){
	var hand = handler.handleRequest(request, response);
}

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);