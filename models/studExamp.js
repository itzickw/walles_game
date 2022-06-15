const mongoose = require("mongoose");

const studSchame = new mongoose.Schema({
//Write you schema here
name:String,
info:Object,
questions:Object

 });

const student = mongoose.model("student", studSchame);

module.exports = student;
