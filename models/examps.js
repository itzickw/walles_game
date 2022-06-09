const mongoose = require("mongoose");

const exampSchame = new mongoose.Schema({
  //Write you schema here
name:String, 
broto:Number, 
net:Number,
questions:Array

});

const Example = mongoose.model("example", exampSchame);

module.exports = Example;
