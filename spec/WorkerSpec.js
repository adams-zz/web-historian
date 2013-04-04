// allows us to run tests async
function async(cb){
  waits(2000);
  runs(cb);
}

var stubs = require("../specHelpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];
    var resultUrls;

    var urlSource = new stubs.FileReadStream(urlArray.join("\n"));
    // console.log("urlSource: ",urlSource);

    var resultArray;
    var result = htmlFetcherHelpers.readUrls(urlSource, function(urls){
      // console.log("reading urls; urls is " + urls);
      resultArray = urls;
    });

    waits(200);
    runs(function(){
      // console.log("in expectation")
      expect(resultArray).toEqual(urlArray);
    });
  });

  xit("should download and store HTML for URLs", function(){
    var paths = [];
    htmlFetcherHelpers.downloadUrls(["www.github.com", "www.parse.com"], function(paths){
      // TODO: finish this callback to complete the test.
    });
    async(function() {
      expect(paths[0]).toEqual("/Users/Catalyst/code/archive.org/data/sites/www.github.com"); // the resulting file should be titled www.github.com
    });
  });
});