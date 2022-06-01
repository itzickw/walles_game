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

const Product = require("../models/product");

Router.get("/update/:id", (req, res) => {
  let id = req.params.id;
  let chosen = products.filter((item) => item.id == id);
  console.log(chosen[0]);
  res.render("update.ejs", { chosen });
});

Router.delete("/delete", async (req, res) => {
  const id = "6295ccf6e538166c8a490f18";

  let prod = await Product.findByIdAndDelete(id);

  res.send(prod);
});

Router.get("/addExp", async (req, res) => {
  const barry = new Product({
    name: "barry",
    cost: 18,
    info: {
      stock: {
        color: "red",
        inStore: 11,
        onLine: 100,
      },

      comments: {
        title: {
          body: "The best barry out there",
          active: true,
        },
        gradeColor: "red",
      },
    },
  });

  await barry.save();
  res.send(barry);
});


Router.get('/show', async (req,res)=>{
  const price = 8

  let data = await Product.find({cost:price})

  console.log(data);
  res.send(data)

})

Router.patch("/update/prod-update/:id", (req, res) => {
  console.log(req.body);
  res.send("in updaete");
});

Router.post("/add", (req, res) => {
  // This will neeed to send to Mongo
  const { tag, title, cost, body } = req.body;
  let id = uuidv4();
  products.push({ tag, title, cost, body, id });
  res.redirect("/product");
});

Router.get("/back-home", (req, res) => {
  res.redirect("/product");
});
Router.get("/add-new", (req, res) => {
  res.render("add.ejs");
});

Router.get("/", (req, res) => {
  res.render("index.ejs", { products });
});

module.exports = Router;
