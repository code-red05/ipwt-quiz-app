const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("./src/db/mongoose"); //mongoose connection
const { MongoClient, ObjectID } = require("mongodb");
//import models
const {
  Geography,
  Maths,
  Science,
  Miscellaneous,
  Computer,
} = require("./src/models/categories");
const {
  GeographyQuiz,
  ScienceQuiz,
  MathsQuiz,
  MiscellaneousQuiz,
  ComputerQuiz,
} = require("./src/models/quizzes");
const { isValidObjectId } = require("mongoose");

//app.use(express.json());
//request body parsing
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

//quiz created and saved to database
app.post("/quiz_created", (req, res) => {
  //res.send(req.body);
  console.log(req.body);
  const { quizname, question, optiona, optionb, optionc, optiond, correct } =
    req.body;
  const quizid = new ObjectID(); //creating quizid

  const quiz = {
    quizid,
    quizname,
    question,
    optiona,
    optionb,
    optionc,
    optiond,
    correct,
  }; //quiz object to be stored

  for (let i = 0; i < correct.length; i++) {
    correct[i] = quiz[correct[i]][i];
  } //assigning correct answers

  let quizNew; //creating document of the obj
  if (req.body.category == "Geography") {
    quizNew = new GeographyQuiz(quiz);
  } else if (req.body.category == "Mathematics") {
    quizNew = new MathsQuiz(quiz);
  } else if (req.body.category == "Science") {
    quizNew = new ScienceQuiz(quiz);
  } else if (req.body.category == "Computers") {
    quizNew = new ComputerQuiz(quiz);
  } else if (req.body.category == "Miscellaneous") {
    quizNew = new MiscellaneousQuiz(quiz);
  }

  //now save the doc to a collection in database
  quizNew
    .save()
    .then(() => {
      console.log("Successful!");
      console.log(quiz);
      res.send(quiz);
    })
    .catch((e) => {
      console.log(e);
    });
  //object successfully getting stored in database!
  //
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
