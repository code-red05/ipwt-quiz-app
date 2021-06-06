const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
require("./src/db/mongoose"); //mongoose connection
var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

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

const { User } = require("./src/models/users");

const { Submission } = require("./src/models/submissions");

//app.use(express.json());
//request body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

//for setting template engine
app.set("view engine", "ejs");
app.set("views", "./templates");

app.get("/", (req, res) => {
  if (req.session.username)
    res.render("views/home", {
      logged_in: true,
      username: req.session.username,
    });
  else res.render("views/home", { logged_in: false, username: null });
});

app.get("/login", (req, res) => {
  res.render("views/login", { error: false });
});

app.post("/login", (req, res) => {
  let userinfo = User.findOne({ username: req.body.nm });
  userinfo.then((user) => {
    if (user == null)
      res.render("views/login", { error: "Username does not exist" });
    else {
      if (user.password == req.body.pwd) {
        req.session.username = user.username;
        console.log(req.session);
        res.redirect("/");
      } else res.render("views/login", { error: "Incorrect Password" });
    }
  });
});

app.get("/signup", (req, res) => {
  res.render("views/signup", { error: false });
});

app.post("/signup", (req, res) => {
  if (req.body.pwd == req.body.pwd2) {
    let username = req.body.nm;
    let password = req.body.pwd;
    const user = {
      username,
      password,
    };
    const new_user = new User(user);
    new_user
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((error) => {
        res.render("views/signup", { error: "Username already taken!" });
      });
  } else res.render("views/signup", { error: "Passwords do not match!" });
});

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
  if (req.session.username)
    res.render("views/attemptQuiz", { username: req.session.username });
  else res.render("views/login", { error: "Please Login First" });
});

app.post("/attempt_quiz", (req, res) => {
  const quizid = req.body.quizid;
  const cat = req.body.category;

  if (cat === "Geography") {
    quizgrp = GeographyQuiz.findOne({ quizid });
  } else if (cat === "Science") {
    quizgrp = ScienceQuiz.findOne({ quizid });
  } else if (cat === "Maths") {
    quizgrp = MathsQuiz.findOne({ quizid });
  } else if (cat === "Computer") {
    quizgrp = ComputerQuiz.findOne({ quizid });
  } else if (cat === "Miscellaneous") {
    quizgrp = MiscellaneousQuiz.findOne({ quizid });
  }

  quizgrp
    .then((quiz) => {
      quiz.category = cat;
      res.render("views/displayQuiz", quiz);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/view_results", (req, res) => {
  const { quizid, category, marked } = req.body;
  if (category === "Geography") {
    quizgrp = GeographyQuiz.findOne({ quizid });
  } else if (category === "Science") {
    quizgrp = ScienceQuiz.findOne({ quizid });
  } else if (category === "Maths") {
    quizgrp = MathsQuiz.findOne({ quizid });
  } else if (category === "Computer") {
    quizgrp = ComputerQuiz.findOne({ quizid });
  } else if (category === "Miscellaneous") {
    quizgrp = MiscellaneousQuiz.findOne({ quizid });
  }

  let score = 0; //score
  let status = []; //status : right/wrong
  quizgrp
    .then((resquiz) => {
      const {
        quizname,
        correct,
        optiona,
        optionb,
        optionc,
        optiond,
        question,
      } = resquiz;
      for (let i = 0; i < marked.length; i++) {
        if (correct[i] === resquiz[marked[i]][i]) {
          score++;
          status.push("Right");
        } else {
          status.push("Wrong");
        }
      }

      //submissions save
      const sub = {
        username: req.session.username,
        category,
        quizid: new ObjectID(quizid),
        quizname,
        score,
      };
      const newSub = new Submission(sub);
      newSub
        .save()
        .then(() => {
          console.log("Successful!");
        })
        .catch((error) => {
          console.log(error);
        });

      results = {
        quizid,
        quizname,
        category,
        question,
        optiona,
        optionb,
        optionc,
        optiond,
        correct,
        score,
        status,
        marked,
      };
      res.render("views/viewResults", { results: results });
    })
    .catch((e) => {
      console.log(e);
    });
});

//to access create_quiz page
app.get("/create_quiz", (req, res) => {
  if (req.session.username) res.sendFile(__dirname + "/create_quiz.html");
  else res.render("views/login", { error: "Please Login First" });
});

//quiz created and saved to database
app.post("/quiz_created", (req, res) => {
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
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
  //object successfully getting stored in database!
  //
});

//to display quiz history
app.get("/quiz_history", (req, res) => {
  const subs = Submission.find({ username: req.session.username });
  subs
    .then((subms) => {
      res.render("views/quizHistory", {
        username: req.session.username,
        subs: subms,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(3000, () => {
  console.log("App listening at http://localhost:3000");
});
