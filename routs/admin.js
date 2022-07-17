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
const student = require("../models/studExamp");
const { findById } = require("../models/questionnaire");


Router.get("/studentUpdate/:id", auth, async (req, res) => {
  if (!req.user.admin) res.render("helpers/noAcess.ejs");
  let id = req.params.id;
  let data = await Student.find({ _id: id });
let teachers = await User.find();
  res.render("stud/studUpdateRequest.ejs", { data,teachers });
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
