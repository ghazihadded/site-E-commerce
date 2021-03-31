const express = require("express");
const router = express.Router();
const {validator,registerProductRules}=require('../middlewares/Validation')
const auth=require('../middlewares/auth')

const {
  getProducts,
  getProductsAll,
  createProduct,
  getSingleProduct,
  updateProducts,
  deleteProducts,
  addReviews,
  getReviews,
  getSearchProduct
} = require("../controlles/productControlles");

router.route("/products").post(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.get('/products/all',auth,getProductsAll)
router.post("/admin/product/new",auth,registerProductRules(),validator,createProduct);
router.put("/admin/product/:_id",auth,updateProducts);
router.delete("/admin/product/delete/:id",auth,deleteProducts);
router.put("/admin/reviews/:id",auth,addReviews);
router.get("/admin/reviews/:id",auth,getReviews);
router.get("/admin/products/:search",getSearchProduct);


module.exports = router;
