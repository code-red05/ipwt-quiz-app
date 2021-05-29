const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

//quiz question model
const quiz = new Schema({
  quizid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  optiona: {
    type: String,
    required: true,
  },
  optionb: {
    type: String,
    required: true,
  },
  optionc: {
    type: String,
    required: true,
  },
  optiond: {
    type: String,
    required: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

//following are models of quiz questions for each category
const GeographyQuiz = new Model("GeographyQuiz", quiz);
const ScienceQuiz = new Model("ScienceQuiz", quiz);
const MathsQuiz = new Model("MathsQuiz", quiz);
const MiscellaneousQuiz = new Model("MiscellaneousQuiz", quiz);
const ComputerQuiz = new Model("ComputerQuiz", quiz);

module.exports = {
  GeographyQuiz,
  ScienceQuiz,
  MathsQuiz,
  MiscellaneousQuiz,
  ComputerQuiz,
  quiz,
};
//not exported to any file yet
