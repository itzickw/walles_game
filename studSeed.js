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

const newStud = new Student({
  name: "Moshe Cohen",
  info: {
    "T.Z": 12345,
    phone: 12345,
  },
  questions: {
    "behavioral-red": { 1: { pass: false }, 2: { pass: false } },
    "behavioral-blue": { 3: { pass: false }, 4: { pass: false } },
  },
});
const newStud2 = new Student({
  name: "Yaron Lavi",
  info: {
    "T.Z": 12345,
    phone: 12345,
  },
  questions: {
    "behavioral-red": { 1: { pass: false }, 2: { pass: false } },
    "behavioral-blue": { 3: { pass: false }, 4: { pass: false } },
  },
});

// const makeQ = async () => {
//   let resolt = await newStud2.save();
//   console.log(resolt);
// };

makeQ();
