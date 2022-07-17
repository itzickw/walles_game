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

const Question = require("../models/questionnaire");

Router.post("/addQ", async (req, res) => {
  let qBody = "How are you feeling";
  let qColor = "red";
  let qskill = "emotionSkills";

  let data = await Question.findByIdAndUpdate("629f2030a2831e381b8f99b7", {
    emotionSkills: { testing: "hello" },
  });

  console.log(data);
  res.send("done");
});

Router.get("/", (req, res) => {
  res.render("questionnaires/index.ejs");
  //res.send("I am in question");
});

Router.get("/RequestAddNew", (req, res) => {
  res.render("questionnaires/addNew.ejs");
});

Router.post("/addNew", async (req, res) => {
  const { skill, color } = req.body;

  let data = await Question.findOne({ color: color, skill: skill }).exec();
  //console.log(data);

  //if the questionnarie alredy exist
  if (data != null) {
    res.render("questionnaires/updateRequest.ejs", { data });
    return;
  }

  //create a new questionnaire
  let id = uuidv4();
  data = new Question({
    color: color,
    skill: skill,
    bruto: 0,
    neto: 0,
    questions: [],
  });

  //saving the new questionnaire to mongo
  let result = await data.save();
  res.render("questionnaires/updateRequest.ejs", { data });
});

Router.post("/update", async (req, res) => {
  const { color, skill, id, text, active, lastActive } = req.body;
  //try to catch th questionnaire by question id.
  //let exchangeData = await Question.findOne({_id: id}).exec();
  //console.log(exchangeData);

  let data = await Question.findOne({ color: color, skill: skill }).exec();

  //changing the requested question
  for (ques of data.questions) {
    if (ques.id == id) {
      //if there was a change in active
      if (active != lastActive) {
        if (active == "true") {
          data.neto = data.neto + 1;
          ques.active = true;
        } else {
          data.neto = data.neto - 1;
          ques.active = false;
        }
      }
      //if there was a change in the question text
      if (text != "") ques.text = text;
    }
  }
  console.log(data.neto);
  //update mongo
  let updateQestion = await Question.findOneAndUpdate(
    { color: color, skill: skill },
    { questions: data.questions, neto: data.neto },
    { new: true }
  );

  res.render("questionnaires/updateRequest.ejs", { data });
});

Router.post("/addQuestion", async (req, res) => {
  const { color, skill, text } = req.body;

  let data = await Question.findOne({ color: color, skill: skill }).exec();
  //console.log(data);

  let newQuestion = { id: uuidv4(), text, active: true };
  data.questions.push(newQuestion);
  data.bruto += 1;
  data.neto += 1;

  //update mongo
  let update = await Question.findOneAndUpdate(
    { color: color, skill: skill },
    { questions: data.questions, bruto: data.bruto, neto: data.neto }
  );

  res.render("questionnaires/updateRequest.ejs", { data });
});

module.exports = Router;
