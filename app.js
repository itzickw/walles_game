const express = require("express");
const app = express();
const port = 3000;
const { join } = require("path");
// inporting Routs
const prod = require("./routs/products");
const question = require("./routs/question");
const pupil = require("./routs/pupils");
const examp = require("./routs/exapms");

app.set("views", join(__dirname, "views"));
app.set("view engien", "ejs");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
// conneting to mongoose

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

// this is to convert json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// need to look again at method overide
app.use(methodOverride("X-HTTP-Method-Override"));

app.use("/product", prod);
app.use("/Pupil", pupil);
app.use("/question", question);
app.use("/examp", examp);

app.post("/car", (req, res) => {
  console.log("I am a POST CAR");
  res.send("<h1>I am in CAR</h1>");
});

app.get("/car", (req, res) => {
  console.log("car works");
  res.send("<h1>I am in CAR</h1>");
});

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.send("This page doesnot work");
});

app.listen(port, () => {
  console.log(`listing on port ${port}`);
});
