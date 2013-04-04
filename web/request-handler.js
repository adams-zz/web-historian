var fs = require('fs');
var queryString = require('querystring');

function pathOf(req) {
	return require('url').parse(req.url).pathname;
}

exports.handleRequest = function (req, res, outputOverride) {
	console.log("Serving request type " + req.method + " for url " + req.url);
  var fileName = pathOf(req).slice(1);
  if (req.method === "GET"){
		res.writeHead(200, {"Content-Type": "text/html"});
		if(fileName === "") {
			fs.readFile(__dirname + '/public/index.html', function(err, data){
				if (err) throw err;
				var string = "" + data;
				res.end(string);
			});
		} else {
			var URL = __dirname + '/../data/sites/' + fileName;
			fs.readFile(URL, function(err, data) {
				// TO-DO: Should detect if file exists, put 404 into own else statement below
				if (err) {
					res.writeHead(404, {"Content-Type": "text/html"});
					res.end();
				}
				var string = "" + data;
				res.end(string);
			});
		}
	} else if (req.method === "POST"){
		res.writeHead(201, {"Content-Type": "text/html"});
		// TO-DO: Store time associated with request
		// var d = new Date(year, month, day, hours, minutes, seconds, milliseconds);

		req.on('data', function(data){
			stringdata = "" + data;
			// var URL = queryString.parse(stringdata).url + "\n";
			var URL = JSON.parse(stringdata).url + "\n";
			console.log(URL);

			var filePath = __dirname + '/../data/sites.txt';
			fs.appendFile(filePath, URL, function(err, data) {
				if (err) throw err;
			});
			res.end();
		});
	}
};