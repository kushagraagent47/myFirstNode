var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);

var app = express();



//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//Set static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req , res){
  db.users.find(function (err, docs) {
    // docs is an array of all the documents in mycollection
  
  res.render('index', {
    title: 'Customers',
    users: docs
    });
  })
});

//Signup FORm
app.post('/users/add', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

});


app.listen(3000, function(){
    console.log("started"); 
});