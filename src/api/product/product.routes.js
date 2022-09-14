const router = require("express").Router();

const productController = require("./product.controller");

/* Add Job*/
router.route("/product/add").post(productController.addProduct);
router.route("/product/create").post(productController.createProduct);
router.route("/product/getAll").get(productController.getAllproduct);

/* Get Job*/
// router.route('/').get(verifyAccessToken, productController.getJobs);

module.exports = router;
