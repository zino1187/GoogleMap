
var express = require("express");

var http = require("http");
var app = express();

app.use(function(request, response){
    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    response.end("this is express module");
});

app.ulse
app.listen(8888, function(){
    console.log("Express module server is running at 8888..");
});