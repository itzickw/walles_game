const mongoose = require("mongoose");

const questionsSchame = new mongoose.Schema({
//Write you schema here
    lifSkills: {
        red: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        orange: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions: {
                question6: {
                    question:String,
                    activity:Boolean
                },
            }
        },
        yellow: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        green: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        lime: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
    },
    emotionSkills: {
        red: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        orange: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        yellow: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        green: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        lime: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },        
        }
    },
    learningSkills:{
        red: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        orange: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        yellow: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        green: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        },
        lime: {
            color:String,
            questionsSum:Number,
            activeQuestions:Number,
            questions:{
                question1: {
                    question:String,
                    activity:Boolean
                },
            },
        }
    },
});

const Question = mongoose.model("question", questionsSchame);

module.exports = Question;
