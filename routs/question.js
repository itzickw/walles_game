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
const auth = require("../middleware/auth");
const sources = require("../sources");
const { Route } = require("routes");

Router.get("/RequestAddNew", auth, async  (req, res) => {
  let data = await Question.find({});
  let admin = req.user.admin;
  let update = true;
  //console.log(data);

  res.render("questionnaires/questionnairesView.ejs", { data, sources, admin, update });
});

Router.get("/addNew/:id", auth, async (req, res) => {
  const id = req.params.id;
  let admin = req.user.admin
  let data = await Question.findOne({ _id: id });
    
  res.render("questionnaires/updateRequest.ejs", { data, admin });
});

Router.post("/addNew/:id/update", auth, async (req, res) => {
  let qId = req.params.id;
  const { id, text, answer, active, lastActive } = req.body;
  
  let data = await Question.findOne({ _id: qId }).exec();

  //changing the requested question
  for (ques of data.questions) {
    if (ques.id == id) {
      //if there was a change in active
      if (active != lastActive) {
        if (active == "true") {
          data.neto = data.neto + 1;
          ques.active = true;
        } else {
          data.neto = data.neto - 1;
          ques.active = false;
        }
      }
      //if there was a change in the question text
      if (text != "") ques.text = text;
      if (answer != "") ques.answer = answer;

      if(ques.closed)
        for(let i = 0; i < ques.options.length; i++)    
          if(req.body["option " + i] != "")
          {
            console.log(req.body["option " + i]);
            ques.options[i] = req.body["option " + i];                  
          }
    }
  }
  console.log(req.body);
  //update mongo
  let updateQestion = await Question.findOneAndUpdate(
    { _id: qId },
    { questions: data.questions, neto: data.neto },
    { new: true }
  );

  res.redirect("/question/addNew/" + qId);
});

Router.post("/addQuestion", auth, async (req, res) => {
  const { color, skill, text, answer } = req.body;

  let data = await Question.findOne({ color: color, skill: skill });
  let admin = req.user.admin;
  
  if(data.questions.find(x => x.text == text) == undefined)
  {
    let newQuestion = { id: uuidv4(), text, answer, active: true };
    data.questions.push(newQuestion);
    data.bruto += 1;
    data.neto += 1;
    
    //update mongo
    let update = await Question.findOneAndUpdate(
      { color: color, skill: skill },
      { questions: data.questions, bruto: data.bruto, neto: data.neto }
    );
  }
      
  res.render("questionnaires/updateRequest.ejs", { data, admin });
});

Router.get("/addOpenQuestion/:id", auth, (req, res) => {
  let id = req.params.id;
  
  res.render("questionnaires/addOpenQuestion.ejs", {id});
})

Router.post("/addOpenQuestion/:id", auth, async (req, res) => {
  let id = req.params.id;
  const { text, answer } = req.body;

  let data = await Question.findOne({ _id: id });
  
  if(data.questions.find(x => x.text == text) == undefined)
  {
    let newQuestion = { id: uuidv4(), text, answer, active: true };
    data.questions.push(newQuestion);
    data.bruto += 1;
    data.neto += 1;
    
    //update mongo
    let update = await Question.findOneAndUpdate(
      { _id: id },
      { questions: data.questions, bruto: data.bruto, neto: data.neto }
    );
  }

  res.redirect("question/addNew/" + id);
})

Router.post("/addNew/addClosedQuestion/:id", auth, (req, res) => {
  let id = req.params.id;
  const {numOfChoices} = req.body;
  //console.log(req.params);
  res.render("questionnaires/addClosedQuestion.ejs", { id, numOfChoices });
})

Router.post("/addNew/addClosedQuestion/:id/update", auth, async (req, res) => {
  let id = req.params.id;
  const obj = req.body;
  const admin = req.user.admin;

  let data = await Question.findOne({ _id: id });
  if(data.questions.find(x => x.text == obj.text) == undefined)
  {
    let newClosedQ = {
      id: uuidv4(),
      text: obj.text, 
      answer: obj.answer,
      closed: true,
      options: [],  
      active: true,
    }
  
    for(let i = 0; i < obj.numOfChoices - 1; i++)
    {
      newClosedQ.options.push(obj[i])
    }
    
    data.bruto += 1;
    data.neto += 1;
    data.questions.push(newClosedQ);

    //update mongo
    let update = await Question.findOneAndUpdate(
      { _id: id },
      { questions: data.questions, bruto: data.bruto, neto: data.neto }
    );
    console.log(newClosedQ);
  }
  res.redirect("/question/addNew/" + id)
})
module.exports = Router;