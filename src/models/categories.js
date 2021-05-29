const mongoose = require("mongoose");
const { Schema, Model } = mongoose;
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
const Geography = new Model("Geography", category);
const Maths = new Model("Maths", category);
const Science = new Model("Science", category);
const Miscellaneous = new Model("Miscellaneous", category);
const Computer = new Model("Computer", category);

module.exports = {
  Geography,
  Maths,
  Science,
  Miscellaneous,
  Computer,
  category,
};
//these models havent been exported yet to any other files
