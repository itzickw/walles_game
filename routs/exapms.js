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

const Example = require("../models/examps");

// update a question- look at the $ inotation

Router.post("/update/question/:id", async (req, res) => {
  // catching the ID of the question
  let qId = req.params.id;
  const { active, qBody } = req.body;
  // Id is to find the right obj

  // req.body to get the anwers from the user

  // console.log(active, qBody);
  // console.log(qId);
  let myQ = await Example.updateOne(
    { "questions.qId": `${qId}` },
    {
      $set: {
        "questions.$.qBody": `${qBody}`,
        "questions.$.active": `${active}`,
      },
    }
  );
  // res.send("I Am in update");
  res.redirect("/examp");
});

Router.get("/update/:qId", async (req, res) => {
  // catching the ID of the question
  let qId = req.params.qId;
  // gettin a specfic array bassed on ID
  let chosenQ = await Example.findOne({
    "questions.qId": `${qId}`,
  });
  // filtering the data to get teh desired questioner
  chosenQ = chosenQ.questions.filter((item) => item.qId == qId);
  const [data] = [...chosenQ];

  res.render("examp/update-chosen.ejs", { data });
});

// Addes a new question to an existing questioner
Router.post("/newQuestion", async (req, res) => {
  let { question, color, qBody } = req.body;
  // title will aloow to pick the right question
  let title = `${question}-${color}`;
  let obj = { qBody, active: true, qId: uuidv4() };

  let updatedQuestioner = await Example.findOne({ name: title });
  // adding the needed numbers
  let broto = updatedQuestioner.broto;
  let myRes = broto + 1;
  let net = updatedQuestioner.net;
  let mynet = net + 1;
  // adding the question and counting
  let selctedQ = await Example.findOneAndUpdate(
    { name: title },
    { $push: { questions: obj }, broto: myRes, net: mynet }
  );

  res.redirect("/examp");
});

// Addes a totaly new questioner
Router.post("/be-examp", async (req, res) => {
  let { question, color, qBody } = req.body;
  let title = `${question}-${color}`;
  let obj = { qBody, active: true, qId: uuidv4() };
  const newExmp = new Example({
    name: title,
    broto: 1,
    net: 1,
    questions: [obj],
  });
  // remove from comment if you want to use
  //   let result = await newExmp.save();
  // console.log(obj);
  res.send("got the body");
});
//navgation routs


Router.get("/addTo", (req, res) => {
  res.render("examp/addTo-examp.ejs");
});

Router.get("/add", (req, res) => {
  res.render("examp/add-examp.ejs");
});
Router.get("/", async (req, res) => {
  let data = await Example.find();
  // console.log(data);
  res.render("examp/examp.ejs", { data });
});

module.exports = Router;
