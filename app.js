var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongojs = require("mongojs");
var db = mongojs("customerapp", ["users"]);
var ObjectId = mongojs.ObjectID;
var app = express();

//View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Set static path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  db.users.find(function(err, docs) {
    // docs is an array of all the documents in mycollection

    res.render("index", {
      title: "Customers",
      users: docs
    });
  });
});

//Signup FORm
app.post("/users/add", function(req, res) {
  var newUser = {
    first_name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    pass: req.body.pass
  };
  db.users.insert(newUser, function(err, result) {
    res.redirect("/");
  });
});

app.get("/newsfeed", function(req, res) {
  // docs is an array of all the documents in mycollection
  res.render("newsfeed");
});

//Login Form
app.post("/users/login", function(req, res) {
  var userLogin = {
    username: req.body.username,
    pass: req.body.password
  };
  db.users.find(userLogin, function(err, result) {
   
    res.redirect("/newsfeed/"+ result);
    
    console.log(userLogin);
  });
});

//Total Users
app.get("/users", function(req, res) {
  db.users.find(function(err, docs) {
    // docs is an array of all the documents in mycollection

    res.render("users", {
      title: "Customers",
      users: docs
    });
  });
});

app.delete("/users/delete/:id", function(req, res) {
  db.users.remove({ _id: ObjectId(req.params.id) }, function(err, result) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, function() {
  console.log("Server started");
});
