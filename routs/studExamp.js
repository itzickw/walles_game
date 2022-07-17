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

const Student = require("../models/studExamp");
const Question = require("../models/questionnaire");
const auth = require("../middleware/auth");

const { json } = require("body-parser");
const student = require("../models/studExamp");

// 90% same code like the red one
Router.post("/behaveBlue/:id", async (req, res) => {
  let id = req.params.id;
  const obj = req.body;
  let resolt = await Student.findOneAndUpdate(
    { _id: id },
    {
      "questions.behavioralBlue": obj,
    }
  );
  console.log(resolt);
  res.redirect("/stud");
});

// This is the route for teh red... I will copy paste and adhust to make one for the blue
Router.post("/behaveRed/:id", async (req, res) => {
  let id = req.params.id;
  const obj = req.body;
  let resolt = await Student.findOneAndUpdate(
    { _id: id },
    {
      "questions.behavioralRed": obj,
    }
  );
  console.log(resolt);
  res.redirect("/stud");
});

/*
Router.get("/goToq/:id", async (req, res) => {
  let id = req.params.id;
  let data = await Student.find({ _id: id });
  
  console.log(data);
  res.render("stud/questioner.ejs", { data: data[0] });
});
*/

Router.get("/goToq/:id", async (req, res) => {
  let id = req.params.id;
  let student = await Student.findOne({ _id: id }).exec();
  //console.log(student);
  let lifeSkills = await Question.findOne({
    color: student.skills[0].color,
    skill: "lifeSkills",
  }).exec();
  //console.log(lifeSkills);
  let emotionSkills = await Question.findOne({
    color: student.skills[1].color,
    skill: "emotionSkills",
  }).exec();
  //console.log(emotionSkills);
  let learningSkills = await Question.findOne({
    color: student.skills[2].color,
    skill: "learningSkills",
  }).exec();
  //console.log(learningSkills);

  let data = {
    student,
    skills: [lifeSkills, emotionSkills, learningSkills],
  };
  //student.skills[0].questions.push(lifeSkills.questions[0].id);
  console.log(data.student);

  res.render("stud/studView.ejs", { data });
});

Router.post("/goToQ/updateResult", async (req, res) => {
  //const {skill, pass, Qid, Sid} = req.body;
  const obj = req.body;
  let skill = obj.skill;
  let Sid = obj.Sid;
  //let keys = obj.keys;

  let student = await Student.findOne({ _id: obj.Sid }).exec();
  //console.log(student);

  for (Qid of obj.Qid) {
    if (obj[Qid] == "true") {
      if (!student.skills[skill].questions.includes(Qid))
        student.skills[skill].questions.push(Qid);
    } else {
      if (student.skills[skill].questions.includes(Qid)) {
        let index = student.skills[skill].questions.indexOf(Qid);
        if (index > -1) student.skills[skill].questions.splice(index, 1);
      }
    }
  }

  /*
  let exist = false;
  if( student.skills[skill].questions.includes(Qid))
  exist = true;
  if(pass == "true"){
    if(!exist)
    student.skills[skill].questions.push(Qid);
  }
  else{
    if(exist)
    {
      let index = student.skills[skill].questions.indexOf(Qid);
      if(index > -1)
      student.skills[skill].questions.splice(index, 1);
    }      
    console.log(student.skills[skill].questions);
  }
  */

  let result = await Student.findOneAndUpdate(
    { _id: Sid },
    { skills: student.skills },
    { new: true }
  );

  let lifeSkills = await Question.findOne({
    color: student.skills[0].color,
    skill: "lifeSkills",
  }).exec();
  let emotionSkills = await Question.findOne({
    color: student.skills[1].color,
    skill: "emotionSkills",
  }).exec();
  let learningSkills = await Question.findOne({
    color: student.skills[2].color,
    skill: "learningSkills",
  }).exec();

  let data = {
    student,
    skills: [lifeSkills, emotionSkills, learningSkills],
  };

  res.render("stud/studView.ejs", { data });
});

Router.post("/goToQ/nextStage", async (req, res) => {
  const { skill, color, Sid, passQuestions } = req.body;
  let colors = ["red", "orange", "yellow", "aqua", "lime"];
  let index = colors.indexOf(color);
  let student = await Student.findOne({ _id: Sid }).exec();
  let passQ = passQuestions.split(",");
  let colorHistory = { color, questions: passQ };
  //console.log(passQ);
  student.history[skill].push(colorHistory);
  student.skills[skill].color = colors[index + 1];
  student.skills[skill].questions = [];

  let update = await Student.findOneAndUpdate(
    { _id: Sid },
    { skills: student.skills, history: student.history }
  );

  let lifeSkills = await Question.findOne({
    color: student.skills[0].color,
    skill: "lifeSkills",
  }).exec();
  let emotionSkills = await Question.findOne({
    color: student.skills[1].color,
    skill: "emotionSkills",
  }).exec();
  let learningSkills = await Question.findOne({
    color: student.skills[2].color,
    skill: "learningSkills",
  }).exec();

  let data = {
    student,
    skills: [lifeSkills, emotionSkills, learningSkills],
  };
  console.log(data);
  res.render("stud/studView.ejs", { data });
});

Router.post("/goToQ/historyView", async (req, res) => {
  const { Sid } = req.body;

  let student = await Student.findOne({ _id: Sid }).exec();
  let questionnaire = await Question.find();

  let data = {
    student,
    questionnaire,
  };
  console.log(data);
  res.render("stud/historyView.ejs", { data });
});

Router.get("/addQ", auth, async (req, res) => {
  console.log(req.user._id);
  console.log(req.user.name);
  console.log(req.user.admin);
  res.send(req.user);
});

Router.get("/addStudent", (req, res) => {
  let skills = ["lifeSkills", "emotionSkills", "learningSkills"];
  res.render("stud/addStud.ejs", { skills });
});

Router.post("/addStuds", async (req, res) => {
  const { name, id, phone, teacher } = req.body;

  const student = new Student({
    name: name,
    info: {
      id: id,
      phone: phone,
      teacher: teacher,
    },
    skills: [
      {
        skill: "lifeSkills",
        color: "red",
        questions: [],
      },
      {
        skill: "emotionSkills",
        color: "red",
        questions: [],
      },
      {
        skill: "learningSkills",
        color: "red",
        questions: [],
      },
    ],
    history: [[], [], []],
  });
  let result = await student.save();
  console.log(result);
  res.redirect("/stud");
});

Router.get("/yaron", async (req, res) => {
  let data = await Student.find({ _id: "62a8012942bef14959fed82e" });
  console.log(data);
  data.questions = null;
  let obj = { test: "Testing this" };
  let myIndex = data.questions;
  myIndex = { msg: "Hello to all" };
  let resoult = Student.findOneAndUpdate({ _id: "62a8012942bef14959fed82e" });
  res.send(data);
  // res.render("stud/stud.ejs", { data });
});

Router.post("/teacherStudentsView", async (req, res) => {
  const { teacher } = req.body;
  let students = await Student.find({ "info.teacher": teacher });
  let data = {
    teacher: "המורה  " + teacher,
    students,
  };
  console.log(data);
  res.render("stud/stud.ejs", { data });
});

Router.get("/studentUpdate/:id", async (req, res) => {
  let id = req.params.id;
  let data = await Student.find({ _id: id });
  console.log(data);
  res.render("stud/studUpdateRequest.ejs", { data });
});

Router.post("/studentUpdate/:id", async (req, res) => {
  let id = req.params.id;
  const { phone, teacher } = req.body;
  let student = await Student.findOne({ _id: id }).exec();

  if (phone != "") student.info.phone = phone;
  if (teacher != "") student.info.teacher = teacher;

  let result = await Student.findOneAndUpdate(
    { _id: id },
    { info: student.info }
  );
  res.redirect("/");
});

Router.get("/", auth, async (req, res) => {
  let { name, _id, admin } = req.user;
  console.log(_id);
  console.log(name);
  console.log(admin);
  console.log("afsk");
  // if (req.user.admin) {
  //   let students = await Student.find({});
  // }
  if (!_id) {
    res.send("</h1> הפרטים שלך אינם נכונים<h1>");
  }
  if (admin) {
    let students = await Student.find({});
  }
  let students = await Student.find({
    "info.teacher": _id,
  });
  let data = {
    teacher: req.user.name,
    students,
  };
  res.render("stud/stud.ejs", { data });
});

module.exports = Router;
