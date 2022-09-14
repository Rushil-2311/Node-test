const Product = require("../../model/product");
const products = require("../json/product.json");
var path = require("path");
const { v4: uuid } = require("uuid");
const fs = require("fs");
module.exports.addProduct = (req, res) => {
  const { name, price, description, quantity, url } = req.body;
  const product = new Product({
    name: name,
    price,
    quantity,
    description,
    url,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

module.exports.createProduct = (req, res) => {
  const { name, price, description, quantity, url } = req.body;
  let PorductData = {
    name: name,
    price,
    quantity,
    description,
    url,
    id: uuid(),
  };
  var jsonPath = path.join(__dirname, "..", "json", "product.json");
  fs.readFile(jsonPath, "utf8", function (err, data) {
    var obj = JSON.parse(data);
    obj.push(PorductData);
    var strNotes = JSON.stringify(obj);
    fs.writeFile(jsonPath, strNotes, function (err) {
      if (err) return res.status(400).json({ err });
      res.status(200).json({ obj });
    });
  });
};

module.exports.readJsonFile = (req, res) => {
  const data = fs.readFileSync(jsonPath);
  var obj = JSON.parse(data);
  console.log(obj, "obj");
};

module.exports.getAllproduct = (req, res) => {
  res.status(200).json({ products });
};
