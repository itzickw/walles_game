const express = require("express");
const app = express();
const Router = require("express").Router();

// importing uuid for ids
const { v4: uuidv4 } = require("uuid");
// connetct ejs
const { join } = require("path");
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const mongoose = require("mongoose");
// importing Product;

const Question = require("./models/questionnaire");

async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/ohalachProject")
    .then(() => {
      console.log("conected to Mongo");
    })
    .catch(() => {
      console.log("something in mongo whent wrong");
    });
}

main();

const makeQ = async () => {
  let skills = ["lifeSkills", "emotionSkills", "learningSkills"];
  let colors = ["red", "orange", "yellow", "aqua", "lime"];
  for (skill of skills) {
    for (color of colors) {
      const questionnaire = new Question({
        color: color,
        skill: skill,
        bruto: 0,
        neto: 0,
        questions: [],
      });

      let result = await questionnaire.save();
      console.log(result);
    }
  }
};

makeQ();
