const mongoose = require("mongoose");
const { Schema } = mongoose;
//each category model will contain 2 fields
const category = new Schema({
  quizid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  quizname: {
    type: String,
    required: true,
  },
});

//following are models for each category
const Geography = mongoose.model("Geography", category);
const Maths = mongoose.model("Maths", category);
const Science = mongoose.model("Science", category);
const Miscellaneous = mongoose.model("Miscellaneous", category);
const Computer = mongoose.model("Computer", category);

module.exports = {
  Geography,
  Maths,
  Science,
  Miscellaneous,
  Computer,
  category,
};
//these models havent been exported yet to any other files
