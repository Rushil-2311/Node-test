const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
   cart:{
     product -->  quantity
   }
*/
const cartSchema = new Schema({
  ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema);
