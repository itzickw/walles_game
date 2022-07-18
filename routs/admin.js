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

const Student = require("../models/studExamp");
const User = require("../models/users");
const Question = require("../models/questionnaire");
const auth = require("../middleware/auth");

const { json } = require("body-parser");
const { findById } = require("../models/questionnaire");

Router.get("/studentUpdate/:id", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let id = req.params.id;
  let data = await Student.findOne({ _id: id });
  let teachers = await User.find();
  console.log(data);
  res.render("stud/studUpdateRequest.ejs", { data, teachers });
});

// this rout is to get the form that makes changes to the student

Router.get("/studView/:id", auth, async (req, res) => {
  const id = req.params.id;
  let data = await Student.findById(id);

  res.send(data);
});

// this route is to add the student
Router.get("/addStudent", (req, res) => {
  let skills = ["lifeSkills", "emotionSkills", "learningSkills"];
  res.render("stud/addStud.ejs", { skills });
});

// this rout is to actuelly add a student

Router.post("/addStuds", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  const { name, tz, phone, studTeacher } = req.body;
  const teachArray = studTeacher.split("-");
  console.log(`this is first ${teachArray[0]}`);
  console.log(`this is second ${teachArray[1]}`);

  const student = new Student({
    name: name,
    teacherId: teachArray[0],
    info: {
      tz: tz,
      phone: phone,
      teacher: teachArray[1],
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

  res.redirect("/admin/students");
});

// This rout is to get the form add students
Router.get("/studentsAddForm", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let teacher = await User.find();

  res.render("stud/addStud.ejs", { teacher });
});
// This rout is  students index
Router.get("/students", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let students = await Student.find();
  console.log(students);
  res.render("admin/stud.ejs", { students });
});

// changing teacher info
Router.post("/userUpdate/:id", auth, async (req, res) => {
  // if someone came in with wrong token
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let id = req.params.id;
  const { name, email, password } = req.body;
  let techer = await User.findById(id);
  let newName = name === "" ? techer.name : name;
  newEmail = email === "" ? techer.email : email;
  let newPassword;
  if (!password) {
    newPassword = teacher.password;
    console.log(newPassword + "in no password");
  } else {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(password, salt);
    console.log(newPassword + "yes password");
  }

  const update = {
    name: newName,
    email: newEmail,
    password: newPassword,
  };

  let result = await User.findOneAndUpdate({ _id: id }, update);

  res.redirect("/admin");
});

// gets the info of a specific teacher

Router.get("/techerinfo/:id", auth, async (req, res) => {
  // if someone came in with wrong token
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let tId = req.params.id;
  let teacher = await User.findById(tId);

  res.render("admin/teacherInfo.ejs", { teacher });
});

// Gets all of teh students of the class
Router.get("/techerClass/:id", auth, async (req, res) => {
  // if someone came in with wrong token
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let tId = req.params.id;
  let teacher = await User.findById(tId);
  let students = await Student.find({ "info.teacher": tId });

  res.render("admin/teacherClass.ejs", { students, teacher });
});

// main rout of admin
Router.get("/", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let teachers = await User.find({});
  console.log(teachers);

  res.render("admin/teachers.ejs", { teachers });
});

module.exports = Router;
