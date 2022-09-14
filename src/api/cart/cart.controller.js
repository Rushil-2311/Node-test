const Cart = require("../../model/cart");
const carts = require("../json/cart.json");
const fs = require("fs");

module.exports.addProductToCart = (req, res) => {
  const { productId } = req.query;
  const { alreadySelectedproducts } = req.body;
  console.log(alreadySelectedproducts, "update");
  console.log(productId, "productId");
  if (alreadySelectedproducts.length === 1) {
    if (
      productId === alreadySelectedproducts[0].productId &&
      alreadySelectedproducts[0].quantity === 0
    ) {
      Cart.findOneAndUpdate(
        { productId },
        {
          $set: {
            productId: productId,
            quantity: alreadySelectedproducts[0].quantity + 1,
          },
        }
      )
        .then((update) => {
          if (update) {
            return res.status(200).json({ update });
          }
        })
        .catch((err) => {
          if (err) return res.status(400).json({ err });
        });
    } else {
      const cart = new Cart({
        productId: productId,
        quantity: 1,
      });
      cart.save((err, update) => {
        if (err) return res.status(400).json({ err });
        if (update) {
          return res.status(200).json({ update });
        }
      });
    }
  }

  alreadySelectedproducts.forEach((doc) => {
    if (productId === doc.productId) {
      Cart.findOneAndUpdate(
        { productId },
        {
          $set: {
            productId: productId,
            quantity: doc.quantity + 1,
          },
        }
      )
        .then((update) => {
          if (update) {
            return res.status(200).json({ update });
          }
        })
        .catch((err) => {
          if (err) return res.status(400).json({ err });
        });
    } else {
      const cart = new Cart({
        productId: productId,
        quantity: 1,
      });
      cart.save((err, update) => {
        if (err) return res.status(400).json({ err });
        if (update) {
          return res.status(200).json({ update });
        }
      });
    }
  });
};

module.exports.cartAdd = (req, res) => {
  const { productId } = req.query;
  fs.readFile(
    "/home/rushil/Desktop/node-test/src/api/json/cart.json",
    "utf8",
    function (err, data) {
      var obj = JSON.parse(data);
      let filterproduct = obj.filter((data) => data.productId === productId);
      if (!filterproduct.length) {
        obj.push({
          productId,
          quantity: 1,
        });
      } else {
        obj.forEach((doc) => {
          if (doc.productId === productId) {
            doc["quantity"] = doc.quantity + 1;
          }
        });
      }
      var strNotes = JSON.stringify(obj);
      fs.writeFile(
        "/home/rushil/Desktop/node-test/src/api/json/cart.json",
        strNotes,
        function (err) {
          if (err) return res.status(400).json({ err });
          res.status(200).json({ obj });
        }
      );
    }
  );
};

module.exports.getAllCart = (req, res) => {
  res.status(200).json({ carts });
};

module.exports.deleteProductFromCart = (req, res) => {
  const { productId } = req.query;
  fs.readFile(
    "/home/rushil/Desktop/node-test/src/api/json/cart.json",
    "utf8",
    function (err, data) {
      var obj = JSON.parse(data);
      let filterproduct = obj.filter((data) => data.productId !== productId);
      var strNotes = JSON.stringify(filterproduct);
      fs.writeFile(
        "/home/rushil/Desktop/node-test/src/api/json/cart.json",
        strNotes,
        function (err) {
          if (err) return res.status(400).json({ err });
          res.status(200).json({ filterproduct });
        }
      );
    }
  );
};

module.exports.decreseQuantityOfproduct = (req, res) => {
  const { productId } = req.query;
  fs.readFile(
    "/home/rushil/Desktop/node-test/src/api/json/cart.json",
    "utf8",
    function (err, data) {
      var obj = JSON.parse(data);
      let filterproduct = obj.filter((data) => data.productId === productId);
      if (!filterproduct.length) {
        return res
          .status(400)
          .json({ message: "don't added product till yet" });
      } else {
        obj.forEach((doc) => {
          if (doc.productId === productId) {
            if (doc.quantity <= 0) {
              doc["quantity"] = 0;
            } else {
              doc["quantity"] = doc.quantity - 1;
            }
          }
        });
      }
      var strNotes = JSON.stringify(obj);
      fs.writeFile(
        "/home/rushil/Desktop/node-test/src/api/json/cart.json",
        strNotes,
        function (err) {
          if (err) return res.status(400).json({ err });
          res.status(200).json({ obj });
        }
      );
    }
  );
};
