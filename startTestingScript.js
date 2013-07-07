var express = require('express');
var http = require('http');
var fs = require('fs');
var injectionStrings = {};
var detectionString = "";

fs.readFile('./injectionString.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  injectionStrings = data.split(",");
  //console.log(injectionStrings);
  console.log("injection strings setup");
});

fs.readFile('./detectionString.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  detectionString = data;
  //console.log(injectionStrings);
  console.log("detection strings setup");
});
  
var app = express();

app.configure(function(){
  app.set('port', 8080);
  //app.set('port', process.env.PORT || 80);
  app.use(express.bodyParser());
});

/*app.get("/:injection", function(req, res){
  
  console.log(req.params.injection);
  var injection = req.params.injection;
  var injectionFound = 0;
  var i = 0;
  while(i < injectionStrings.length){
    if(injection == injectionStrings[i]){
      console.log("replying to injection");
      var injectionFound = 1;
      res.send(detectionString);
      break;
    }
    i = i + 1;
  }
  if(injectionFound == 0){res.send("reply ok no");}    

}); */

app.get("/injectinnext/:injection", function(req, res){
  
  console.log(req.params.injection);
  var injection = req.params.injection;
  var injectionFound = 0;
  var i = 0;
  while(i < injectionStrings.length){
    if(injection == injectionStrings[i]){
      console.log("replying to injection");
      var injectionFound = 1;
      res.send(detectionString);
      break;
    }
    i = i + 1;
  }
  if(injectionFound == 0){res.send("reply ok no");}  

});

app.post("/injectinpost/", function(req, res){
  //var body = JSON.stringify(req.body);
  //console.log(req.body.data);
  var i = 0;
  var injectionFound = 0;
  while(i < injectionStrings.length){
    if(req.body.inject == injectionStrings[i]){
      var injectionFound = 1;
      res.send(detectionString);
      break;
    }
    i = i + 1;
  }
  if(injectionFound == 0){res.send("reply ok no");} 
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("listening");
});