const express = require("express");
const app = express();
const Router = require("express").Router();
const products = require("../data");
// importing uuid for ids
const { v4: uuidv4 } = require("uuid");
// connetct ejs
const { join } = require("path");
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const mongoose = require("mongoose");

const Student = require("../models/studExamp");

Router.get("/addQ", async (req, res) => {
  let lits = "behavioral-red";
  let qId = "32";
  let obj = { pass: false, msg: "grenn" };
  let index = "questions.behavioral-red.800";
  let result = await Student.findOneAndUpdate(
    { _id: "62a8012942bef14959fed82e" },
    { "questions.behavioral-red.800": "Hello new world" }
  );
  console.log(result);
  res.send(result);
});

Router.get("/yaron", async (req, res) => {
  let data = await Student.find({ _id: "62a8012942bef14959fed82e" });
  console.log(data);
  data.questions = null;
  let obj = { test: "Testing this" };
  let myIndex = data.questions;
  myIndex = { msg: "Hello to all" };
  let resoult = Student.findOneAndUpdate(
    { _id: "62a8012942bef14959fed82e" },
  
  );
  res.send(data);
  // res.render("stud/stud.ejs", { data });
});

Router.get("/", async (req, res) => {
  let data = await Student.find();
  console.log(data);
  res.render("stud/stud.ejs", { data });
});

module.exports = Router;
