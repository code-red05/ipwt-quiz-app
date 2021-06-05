const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
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

//app.use(express.json());
//request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//for setting template engine
app.set("view engine", "ejs");
app.set("views", "./templates");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {});

//to fetch quizzes of a particular category
app.get("/quizcat", (req, res) => {
  if (!req.query.category) {
    return console.log("Error displaying quizzes");
  }
  const quizctg = req.query.category;

  let quizgrp;
  if (quizctg == "Geography") {
    quizgrp = GeographyQuiz.find({}, { quizid: 1, quizname: 1 });
  } else if (quizctg == "Science") {
    quizgrp = ScienceQuiz.find({}, { quizid: 1, quizname: 1 });
  } else if (quizctg == "Maths") {
    quizgrp = MathsQuiz.find({}, { quizid: 1, quizname: 1 });
  } else if (quizctg == "Computer") {
    quizgrp = ComputerQuiz.find({}, { quizid: 1, quizname: 1 });
  } else if (quizctg == "Miscellaneous") {
    quizgrp = MiscellaneousQuiz.find({}, { quizid: 1, quizname: 1 });
  }
  quizgrp
    .then((quizzes) => {
      res.send(quizzes).statusCode(200);
    })
    .catch((error) => {
      res.send(error).statusCode(404);
    });
});

//to access attempt quiz page,select category,select quiz and attempt test
app.get("/attempt_quiz", (req, res) => {
  //res.sendFile(__dirname + "/attempt_quiz.html");
  // res.render("views/attemptQuiz");
  //console.log(req.query.category);
  // console.log(GeographyQuiz.find({}, { quizname: 1 }));
  // const quizcat = req.query.category;

  // let quizgrp;
  // if (quizcat == "Geography") {
  //   quizgrp = GeographyQuiz.find({}, { quizname: 1 });
  // } else if (quizcat == "Science") {
  //   quizgrp = ScienceQuiz.find({}, { quizname: 1 });
  // } else if (quizcat == "Maths") {
  //   quizgrp = MathsQuiz.find({}, { quizname: 1 });
  // } else if (quizcat == "Computer") {
  //   quizgrp = ComputerQuiz.find({}, { quizname: 1 });
  // } else if (quizcat == "Miscellaneous") {
  //   quizgrp = MiscellaneousQuiz.find({}, { quizname: 1 });
  // }
  res.render("views/attemptQuiz");
});

//to access create_quiz page
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
