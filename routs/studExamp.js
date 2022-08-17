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


const Question = require("../models/questionnaire");
const User = require("../models/users");
const auth = require("../middleware/auth");
const sources = require("../sources");
const { json } = require("body-parser");

Router.post("/test/:skill/:id/updateEnswer", auth, async (req, res) => {
  let id = req.params.id;
  let skill = req.params.skill;
  const {questionnaireId, qId, answer} = req.body;
  
  console.log(answer);

  let user = await User.findOne({ _id: id });
  let questionnaire = await Question.findOne({_id: questionnaireId});
  let question = questionnaire.questions.find(item => item.id == qId);
  
  let resultObj = 
    user.skills.find(skill => skill.name == questionnaire.skill).questions.find(item => item.id == qId);

  if(resultObj)
  {
    resultObj.answer = answer;
    resultObj.pass = false;
    if(answer == question.answer)
      resultObj.pass = true;
  }
  else{
    resultObj = {
      id: qId,
      answer,
      pass: false,
    }

    if(answer == question.answer)
      resultObj.pass = true;

    user.skills.find(skill => skill.name == questionnaire.skill).questions.push(resultObj);
  }

  let result = await User.findOneAndUpdate(
    { _id: id },
    { skills: user.skills },
    { new: true }
  );

  res.redirect("/stud/test/"+ questionnaire.skill + "/" + id);
});

Router.get("/:id/historyView", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let user = await User.findOne({ _id: id });
  let questionnaire = await Question.find();

  let data = {
    user,
    questionnaire,
  };

  let admin = false;
  
  res.render("users/historyView.ejs", { data, admin });
});

Router.post("/test/:skill/:id/nextStage", auth, async (req, res) => {
  
  let id = req.params.id;
  const { skill, color} = req.body;

  let index = sources.colors.indexOf(color);
  let user = await User.findOne({ _id: id }).exec();

  //pushing this into the fitting skill..
  let colorHistory = { color, questions: user.skills[skill].questions };

  console.log(colorHistory);

  //student history is an array of the skills, skill is a number
  user.history[skill].push(colorHistory);
  user.skills[skill].color = sources.colors[index + 1];
  user.skills[skill].questions = [];

  let update = await User.findOneAndUpdate(
    { _id: id },
    { skills: user.skills, history: user.history }
  );
  
  res.redirect("/stud/test/"+ user.skills[skill].name + "/" + id);
});

Router.get("/test/:skill/:id", auth, async (req, res) => { 
  let skill = req.params.skill;
  let id = req.params.id;
  let admin = req.user.admin;

  let user = await User.findOne({ _id: id });
  skill = user.skills.find(item => item.name == skill);

  skill = await Question.findOne({
    skill: skill.name,
    color: skill.color,
  })  
  
  let colors = sources.colors;
  res.render("users/skillTest.ejs", { user, skill, admin, colors });
});

Router.get("/", auth, async (req, res) => {
  let { name, _id, admin } = req.user;
  
  if (!_id) {
    res.send("</h1> הפרטים שלך אינם נכונים<h1>");
  }

  let user = await User.findOne({
    _id: _id,
  });

  let skills = sources.categories;
  res.render("users/index.ejs", { user, skills });
});


module.exports = Router;
