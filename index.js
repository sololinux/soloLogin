var express = require("express");
var app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/style"));

// index page
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.listen(8080);
console.log("Server is listening on port 8080");
