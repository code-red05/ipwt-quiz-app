const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {});

app.get("/attempt_quiz", (req, res) => {
  res.sendFile(__dirname + "/attempt_quiz.html");
});

app.get("/create_quiz", (req, res) => {
  res.sendFile(__dirname + "/create_quiz.html");
});
app.post("/quiz_created", (req, res) => {
  res.send(req.body);
  //res.write(req.body); //testing
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
