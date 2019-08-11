var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodedb"
});



//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//Set static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req , res){
    res.render('index', {
        title: 'Customers'
    })
});

//Signup FORm
app.post('/users/add', function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO users (name, email) VALUES ?";
    var values = [
      [name, email],
     ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });
});


app.listen(3000, function(){
    console.log("started"); 
});