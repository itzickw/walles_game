const mongoose = require("mongoose");

const productSchame = new mongoose.Schema({
  name: String,
  cost: Number,
  info: {
    stock: {
      color: ["green", "yellow", "blue"],
      inStore: Number,
      onLine: Number,
    },
    comments: {
      title: {
        body: String,
        active: Boolean,
      },
      gradeColor: String,
    },
  },
});

const Product = mongoose.model("Product", productSchame);

module.exports = Product;
