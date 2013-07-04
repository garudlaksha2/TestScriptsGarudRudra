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
  app.set('port', process.env.PORT || 80);
  app.use(express.bodyParser());
});

app.get("/injectinnext/:injection", function(req, res){
  
  console.log(req.params.injection);
  var injection = req.params.injection;
  var i = 0;
  while(i < injectionStrings.length){
    if(injection == injectionStrings[i]){
      res.send(detectionString);
      break;
    }
  }  

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("listening");
});