const Product = require("../../model/product");
const products = require("../json/product.json");
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
  fs.readFile(
    "/home/rushil/Desktop/node-test/src/api/json/product.json",
    "utf8",
    function (err, data) {
      var obj = JSON.parse(data);
      console.log(obj, "hey");
      obj.push(PorductData);
      var strNotes = JSON.stringify(obj);
      fs.writeFile(
        "/home/rushil/Desktop/node-test/src/api/json/product.json",
        strNotes,
        function (err) {
          if (err) return res.status(400).json({ err });
          res.status(200).json({ obj });
        }
      );
    }
  );
};

module.exports.getAllproduct = (req, res) => {
  res.status(200).json({ products });
};
