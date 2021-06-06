const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("Users", user);

module.exports = {
    User
};