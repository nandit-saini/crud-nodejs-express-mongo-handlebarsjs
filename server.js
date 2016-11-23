var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var db = require('./database/db');
var User= require('./controller/user');



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));


server.listen("8000");

app.get("/",function(req,res){

	res.sendFile(__dirname+"/public/homepage.html");

});

// create new users
app.post("/users/new",User.create);

//get user by page id
app.get("/users/page/:page",User.getPage);

app.get("/users/:id",User.get);

//get all users
app.get("/users",User.getAll) 

//update user by id
app.put("/users/:id",User.update);

app.delete("/users/:id",User.delete);