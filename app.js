const express = require("express");
const app = express();
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
app.post("/create_quiz", (req, res) => {
  req.sendFile(__dirname + "/create_quiz.html");
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
