var express = require('express');
var app = express();
var server = require('http').createServer(app);


var bodyParser = require('body-parser');
var db = require('./config/db');

app.use(express.static("public"));

server.listen("8000");



app.get("/",function(req,res){

	res.sendFile(__dirname+"/public/HomePage.html");

});
