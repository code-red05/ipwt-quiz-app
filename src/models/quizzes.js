const mongoose = require("mongoose");
const { Schema } = mongoose;

//quiz question model
const quiz = new Schema({
  quizid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quizname: {
    type: String,
    required: true,
    trim: true,
  },
  question: {
    type: [String],
    required: true,
  },
  optiona: {
    type: [String],
    required: true,
  },
  optionb: {
    type: [String],
    required: true,
  },
  optionc: {
    type: [String],
    required: true,
  },
  optiond: {
    type: [String],
    required: true,
  },
  correct: {
    type: [String],
    required: true,
  },
});

//following are models of quiz questions for each category
const GeographyQuiz = mongoose.model("GeographyQuiz", quiz);
const ScienceQuiz = mongoose.model("ScienceQuiz", quiz);
const MathsQuiz = mongoose.model("MathsQuiz", quiz);
const MiscellaneousQuiz = mongoose.model("MiscellaneousQuiz", quiz);
const ComputerQuiz = mongoose.model("ComputerQuiz", quiz);

module.exports = {
  GeographyQuiz,
  ScienceQuiz,
  MathsQuiz,
  MiscellaneousQuiz,
  ComputerQuiz,
  quiz,
};
//not exported to any file yet
