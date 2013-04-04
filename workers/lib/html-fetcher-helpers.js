var fs = require('fs');
var queryString = require('querystring');
var httpget = require('http-get');
var urlArray = [];

exports.readUrls = function(urlSource, cb){
	// TODO: delete URLs from file after reading them
	var dataFromStream = "";
  urlSource.on('data', function(data) {
		dataFromStream += data;
  });

  urlSource.on('end', function(){
		urlArray = dataFromStream.split("\n");
		cb(urlArray);
  });
};

exports.downloadUrls = function(urls, cb){
	//TODO Use Head to check if the remote file exists before fetching it
	var resultFile;
	for (var i = 0; i < urls.length-1; i++) {
		var options = {url: "http://"+urls[i]};
		var fileDestination = __dirname + '/../../data/sites/' + urls[i];
		httpget.get(options, fileDestination, function(err, result){
			if (err) throw err;
			console.log("File downloaded at: " + result.file);
			resultFile = result.file;

			cb(result.file);
		});
	};
};