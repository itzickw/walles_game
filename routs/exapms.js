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

// Addes a new question to an existing questioner
Router.post("/newQuestion", async (req, res) => {
  let { question, color, qBody } = req.body;
  let title = `${question}-${color}`;
  let obj = { qBody, active: true, qId: uuidv4() };

  let updatedQuestioner = await Example.findOne({ name: title });
  let broto = updatedQuestioner.broto;
  let myRes = broto + 1;
  let net = updatedQuestioner.net;
  let mynet = net + 1;

  let selctedQ = await Example.findOneAndUpdate(
    { name: title },
    { $push: { questions: obj }, broto: myRes, net: mynet }
  );

  res.send("done");
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
  console.log(obj);
  res.send("got the body");
});

Router.get("/addTo", (req, res) => {
  res.render("addTo-examp.ejs");
});

Router.get("/add", (req, res) => {
  res.render("add-examp.ejs");
});
Router.get("/", async (req, res) => {
  let data = await Example.find();
  console.log(data);
  res.render("examp.ejs", { data });
});

module.exports = Router;
