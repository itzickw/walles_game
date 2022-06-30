const express = require("express");
const app = express();
const Router = require("express").Router();
const products = require("./data");
// importing uuid for ids
const { v4: uuidv4 } = require("uuid");
// connetct ejs
const { join } = require("path");
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const mongoose = require("mongoose");
// importing Product;

const Student = require("./models/studExamp");

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/ohalachClass")
    .then(() => {
      console.log("conected to Mongo");
    })
    .catch(() => {
      console.log("something in mongo whent wrong");
    });
}

main();

const stud = new Student({
  name: "Jacob shpitz",
  info: {
    "T.Z": 12345,
    phone: 12345,
  },
  teacher: "Eric",
  questions: {
  bRed:[122,232,4555,123],
  bGreen:[232,11,2134,465,7],
  sRed:[],
  sYellow:[],
  eRed:[]
  },
  history:{

  },
  progress: {
    behavioral: "green",
    social: "yellow",
    educational: "orange",
  },
});

const makeQ = async () => {
  let resolt = await stud.save();
  console.log(resolt);
};

makeQ();
