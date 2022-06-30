const mongoose = require("mongoose");
const { stringify } = require("uuid");

const studSchame = new mongoose.Schema({
  //Write you schema here
name: String,
teacher:String,
info:Object,
progress:Object,
questions:Object

});

const student = mongoose.model("student", studSchame);

module.exports = student;
