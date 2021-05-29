const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quiz_app", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
//here quiz_app is the database
