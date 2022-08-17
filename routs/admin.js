const express = require("express");
const app = express();
const Router = require("express").Router();
const bcrypt = require("bcrypt");
// importing uuid for ids
const { v4: uuidv4 } = require("uuid");
// connetct ejs
const { join } = require("path");
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const mongoose = require("mongoose");

const sources = require("./../sources"); 
const User = require("../models/users");
const Question = require("../models/questionnaire");
const auth = require("../middleware/auth");

const { json } = require("body-parser");
const { findById } = require("../models/questionnaire");
const { truncate } = require("lodash");
//const { NULL } = require("mysql/lib/protocol/constants/types");


//options for student data changes - came from teacherClass.ejs

Router.get("/userUpdate/:id", auth, async (req, res) => { 
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let id = req.params.id;
  let admin = req.user.admin;

  let user = await User.findOne({ _id: id });

  let skills = [];
  for (skill of user.skills)
  {
    skills.push(
      await Question.findOne({
        skill: skill.name,
        color: skill.color,
      })
    );
  }
  console.log(skills);
  let data = {
    user,
    skills,
  };

  colors = sources.colors;
  res.render("users/userUpdate.ejs", { data, admin, colors });
});

Router.post("/studentUpdate/:id", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  console.log(req.body);
  let id = req.params.id;
  const{name, tz, phone, newTeacher} = req.body;
  
  if(name != "")
  {
    await Student.findOneAndUpdate({_id: id}, {name: name});
  }

  if(tz != "")
  {
    await Student.findOneAndUpdate({_id: id}, {'info.tz': tz});
  }

  if(phone != "")
  {
    await Student.findOneAndUpdate({_id: id}, {'info.phone': phone});
  }

  if(newTeacher !=  null)
  {

    let teacher = await User.findOne({_id: newTeacher});
    
    let student = await Student.findOneAndUpdate(
      { _id: id }, {teacherId: newTeacher, 'info.teacher': teacher.name}, {new:true}
      );
  }

  res.redirect("/admin/studentUpdate/" + id);
});

Router.post("/studentUpdate/:id/historyView", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let admin= req.user.body;
  let id = req.params.id;
  console.log(id);
  let student = await Student.findOne({ _id: id }).exec();
  let questionnaire = await Question.find();

  console.log(student.history[1]);

  let data = {
    student,
    questionnaire,
    admin: true,
  };
  
  res.render("stud/historyView.ejs", { data, admin });
});

Router.post("/userUpdate/:id/updateEnswer", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let id = req.params.id;
  const {questionnaireId, qId, answer} = req.body;
  console.log(answer);
  let user = await User.findOne({ _id: id });
  let questionnaire = await Question.findOne({_id: questionnaireId});
  let question = questionnaire.questions.find(item => item.id == qId);
  console.log(questionnaire);
  let resultObj = user.skills.find(skill => skill.name == questionnaire.skill).questions.find(item => item.id == qId);

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

  console.log(resultObj);

  let result = await User.findOneAndUpdate(
    { _id: id },
    { skills: user.skills },
    { new: true }
  );

  console.log(result);

  res.redirect("/admin/userUpdate/" + id);
});

Router.post("/userUpdate/:id/nextStage", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  
  let id = req.params.id;
  const { skill, color, passQuestions } = req.body;

  let index = sources.colors.indexOf(color);
  let user = await User.findOne({ _id: id }).exec();
  
  console.log(passQuestions);
  
  //pushing this into the fitting skill..
  let colorHistory = { color, questions: passQuestions };
  
  //student history is an array of the skills, skill is a number
  user.history[skill].push(colorHistory);
  user.skills[skill].color = sources.colors[index + 1];
  user.skills[skill].questions = [];

  let update = await User.findOneAndUpdate(
    { _id: id },
    { skills: user.skills, history: user.history }
  );
  
  res.redirect("/admin/userUpdate/" + id);
});

// main rout of admin
Router.get("/", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let users = await User.find({admin: false});
  let colors = sources.colors;
  res.render("admin/usersView.ejs", { users, colors });
});

module.exports = Router;