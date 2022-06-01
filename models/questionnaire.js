const mongoose = require("mongoose");

const questionsSchame = new mongoose.Schema({
//Write you schema here

 });

const Question = mongoose.model("question", questionsSchame);

module.exports = Question;
