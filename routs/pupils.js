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

const pupil = require("../models/pupils");



module.exports = Router;
