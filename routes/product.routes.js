const { Router } = require("express");
const {
  getProducts,
  getCartProducts,
  getProductDetails,
} = require("../controllers/product.controller");

const router = Router();

router.get("/getProducts", getProducts);
router.get("/getCartProducts/:id", getCartProducts);
router.get("/getProductDetails/:id", getProductDetails);

module.exports = router;
