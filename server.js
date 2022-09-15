const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./src/helper/keys");
const productRoutes = require("./src/api/product/product.routes");
const cartRoutes = require("./src/api/cart/cart.routes");
const PORT = process.env.PORT || 7003;

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL.toString(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //  zuFdcLWiGqtxWqwB
});
mongoose.connection.on("connected", () => {
  console.log("conneted to mongo yeahh");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

require("./src/model/product");
require("./src/model/cart");
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
