const { listenerCount } = require("../models/Order");
const Order = require("../models/Order");
const Product=require('../models/Products')
//@ http://localhost:4000/api/order *create order *private
exports.createOrder = async (req, res, next) => {
  const { orderItems, shippingInfo, totalPrice } = req.body;
  try {
    const order = new Order({
      orderItems,
      shippingInfo,
      totalPrice,
      user: req.user.id,
    });
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).send([{ msg: "information incorrect" }]);
  }
};

//@ http://localhost:4000/api/order *get my order *private
exports.getMyOrder = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user.id });
    if (order.length === 0) {
      return res.status(400).send([{ msg: "you don't have orders" }]);
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).send([{ msg: "request not completed" }]);
  }
};

//@ http://localhost:4000/api/order *get my order  byid *private
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");
    if (!order) {
      return res.status(400).send([{ msg: "order not found" }]);
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).send([{ msg: "request not completed" }]);
  }
};

//@ http://localhost:4000/api/order *get all order *private
exports.getAllOrder = async (req, res, next) => {
  try {
    const order = await Order.find().sort({date:-1});
    if (order.length === 0) {
      return res.status(400).send([{ msg: "order not found" }]);
    }
    let totalAmount = 0;

    order.forEach(order => {
        totalAmount += order.totalPrice
    }) 

    res.status(200).json({order,totalAmount});
  } catch (err) {
    res.status(500).send([{ msg: "request  not completed" }]);
  }
};

//@ http://localhost:4000/api/order *get all order *private
exports.updateOrderStatus = async (req, res, next) => {
  const {status}=req.body
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).send([{ msg: "order not found" }]);
    }
    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .send([{ msg: "You have already delivered this order" }]);
    }
   
    
    order.orderItems.forEach(async item => {
        await updateStock(item.product,item.quantity)
    });

    order.orderStatus=status
    order.deliveredAt=Date.now()
   await order.save()
    res.status(200).json(order);
  } catch (err) {
    res.status(500).send([{ msg: "request  not completed" }]);
  }
};


async function updateStock(id,qte){
  let product= await Product.findById(id)
  product.stock=product.stock - qte
  await product.save({ validateBeforeSave: false })

}

//@http://localhost:4000/api/v1/admin/product/delete/:id *delete product
exports.deleteOrder = async (req, res, next) => {
  try{

    const order = await Order.findOneAndDelete({_id:req.params.id});
    if (!order) {
      return res
        .status(400)
        .json({ succes: false, message: "this order has already deleted" });
    }
    res.status(200).json({ succes: true,message:"order is deleted" });
  }catch(err){
    res.status(500).send([{succes:false,msg:"error"}])
  }
};