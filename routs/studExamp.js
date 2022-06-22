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
const { json } = require("body-parser");

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

Router.get("/goToq/:id", async (req, res) => {
  let id = req.params.id;
  let data = await Student.find({ _id: id });

  console.log(data);
  res.render("stud/questioner.ejs", { data: data[0] });
});

Router.get("/addQ", async (req, res) => {
  let lits = "behavioral-red";
  let qId = "32";
  let filter = { _id: "62a8012942bef14959fed82e" };
  // let query =   { `questions.behavioral-red.['qId']`:"Hello new world" };
  let obj = { pass: false, msg: "grenn" };
  let index = "questions.behavioral-red.800";
  let result = await Student.findOneAndUpdate(
    { _id: "62a8012942bef14959fed82e" },
    { "questions.behavioral-red.['qId']": "Hello new world" }
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
  let resoult = Student.findOneAndUpdate({ _id: "62a8012942bef14959fed82e" });
  res.send(data);
  // res.render("stud/stud.ejs", { data });
});

Router.get("/", async (req, res) => {
  let data = await Student.find();
  console.log(data);
  res.render("stud/stud.ejs", { data });
});

module.exports = Router;
