const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
