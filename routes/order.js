const express = require("express");
const route = express.Router();

const { orderRules, validator } = require("../middlewares/Validation");
const auth = require("../middlewares/auth");
const {
  createOrder,
  getMyOrder,
  getOrderById,
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controlles/orderControlles");

router.post("/", auth, orderRules(), validator, createOrder);
router.get("/me", auth, getMyOrder);
router.get("/:id", auth, getOrderById);
router.get("/admin/all", auth, getAllOrder);
router.put("/status/:id", auth, updateOrderStatus);
router.delete("/admin/delete/:id", auth, deleteOrder);

module.exports = router;
