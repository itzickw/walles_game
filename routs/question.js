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
  res.send("I am in question");
});

module.exports = Router;
