const express = require("express");
const app = express();
const Router = require("express").Router();
const products = require("./data");
// importing uuid for ids
const { v4: uuidv4 } = require("uuid");
// connetct ejs
const { join } = require("path");
app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");

const mongoose = require("mongoose");
// importing Product;

const Question = require("./models/questionnaire");

async function main() {
    await mongoose
      .connect("mongodb://localhost:27017/ohalachClass")
      .then(() => {
        console.log("conected to Mongo");
      })
      .catch(() => {
        console.log("something in mongo whent wrong");
      });
  }
  
main();

const newQ = new Question({
    lifSkills: {
        red: {
            color:"red",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Red life",
                    activity:true
                },
            },
        },
        orange: {
            color:"orange",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Orange life",
                    activity:true
                },
            },
        },
        yellow: {
            color:"Yellow",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Yellow life",
                    activity:true
                },
            },
        },
        green: {
            color:"Green",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Green life",
                    activity:true
                },
            },
        },
        lime: {
            color:"lime",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of lime life",
                    activity:true
                },
            },
        }
    },
    emotionSkills: {
        red: {
            color:"red",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Red emotion",
                    activity:true
                },
            },
        },
        orange: {
            color:"orange",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Orange emotion",
                    activity:true
                },
            },
        },
        yellow: {
            color:"Yellow",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Yellow emotion",
                    activity:true
                },
            },
        },
        green: {
            color:"Green",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Green emotion",
                    activity:true
                },
            },
        },
        lime: {
            color:"lime",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of lime emotion",
                    activity:true
                },
            },
        }
    },
    learningSkills:{
        red: {
            color:"red",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Red learning",
                    activity:true
                },
            },
        },
        orange: {
            color:"orange",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Orange learning",
                    activity:true
                },
            },
        },
        yellow: {
            color:"Yellow",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Yellow learning",
                    activity:true
                },
            },
        },
        green: {
            color:"Green",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of Green learning",
                    activity:true
                },
            },
        },
        lime: {
            color:"lime",
            questionsSum:1,
            activeQuestions:1,
            questions:{
                question1: {
                    question:"First question of lime learning",
                    activity:true
                },
            },
        }
    },
});
 
// const makeQ =async ()=>{
//    let resolt =await newQ.save()
// console.log(resolt);
// }

makeQ();

