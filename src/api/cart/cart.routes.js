const router = require("express").Router();

const cartController = require("./cart.controller");

router.route("/cart/addToCart").post(cartController.addProductToCart);
router.route("/cart/cartAdd").post(cartController.cartAdd);
router.route("/cart/getAllCart").get(cartController.getAllCart);
router
  .route("/cart/deleteFromCart")
  .delete(cartController.deleteProductFromCart);
router
  .route("/cart/decreseQuantity")
  .get(cartController.decreseQuantityOfproduct);

module.exports = router;
