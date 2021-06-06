const mongoose = require("mongoose");
const { Schema } = mongoose;

const submission = new Schema({
  category: {
    type: String,
    required: true,
  },
  quizid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quizname: {
    type: String,
    required: true,
    trim: true,
  },
  score: {
    type: Number,
  },
});

const Submission = mongoose.model("Submission", submission);
module.exports = {
  Submission,
  submission,
};
