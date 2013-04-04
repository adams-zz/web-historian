// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var fs = require('fs');
var helpers = require('./lib/html-fetcher-helpers');
var cronJob = require('cron').CronJob;

var job = new cronJob('*/1 * * * *', function(){

    var readStream = fs.createReadStream(__dirname + "/../data/sites.txt");
		// pass the stream to helpers.readURLs as a parameter
		var result = helpers.readUrls(readStream, function(urls) {
			var fetchedSites = helpers.downloadUrls(urls, function() {
			});
		});

  }, function () {
    // This function is executed when the job stops
    console.log("Executed htmlfetcher.js at "+Date());
  },
  true /* Start the job right now */
  // timeZone = "America/Los_Angeles" /* Time zone of this job. */
);

