const Product = require("../models/Products");
const User=require('../models/User')
const ApiFeatures = require("../utils/apiFeature");

//@ http://localhost:4000/api/v1/admin/product/new  *create product *private
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({
      succes: true,
      product,
    });
  } catch (err) {
    res.status(500).send([
      {
        succes: false,
        msg: "server error",
      },
    ]);
  }
};

//@ http://localhost:4000/api/v1/product  *get products
exports.getProducts = async (req, res, next) => {

  const {page,limit}=req.body
  try {
    
    const option = {
      page,
      limit,
        sort: {
        date: -1,
      },
    };
    const product = await Product.paginate({}, option);

    /* const product = await apiFeature.query; */
    res.status(200).json({
      succes: true,
       totalPages:product.totalPages,
       totalPorducts:product.totalDocs,
      product:product.docs,
    });
  } catch (error) {
    return res.status(500).json([
      {
        succes: false,
        msg: "information incorrect",
      },
    ]);
  }
};

//@ http://localhost:4000/api/v1/product  *get products
exports.getProductsAll = async (req, res, next) => {


  try {
    
    
    const products = await Product.find().sort({date:-1});

    /* const product = await apiFeature.query; */
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json([
      {
        succes: false,
        message: error.msg,
      },
    ]);
  }
};
//@http://localhost:4000/api/v1/product/:id *get single product
exports.getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json([
        {
          succes: false,
          message: "product not found",
        },
      ]);
    }

    res.status(200).json({ succes: true, product });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json([
        {
          succes: false,
          message: "product not found",
        },
      ]);
    }
  }
};

//@http://localhost:4000/api/v1/admin/product/:id *update product
exports.updateProducts = async (req, res, next) => {
  const { _id } = req.params;

  try {
    let product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json([
        {
          succes: false,
          msg: "product not found",
        },
      ]);
    }

    product = await Product.findOneAndUpdate(
      { _id: _id },
      { $set: req.body },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ succes: true, product });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(400).json([
        {
          succes: false,
          msg: "product not found",
        },
      ]);
    }
  }
};

//@http://localhost:4000/api/v1/admin/product/delete/:id *delete product
exports.deleteProducts = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ succes: true, product, message: "product is deleted" });
  } catch (err) {
    res.status(500).send([{ succes: false, msg: "error" }]);
  }
};

//@http://localhost:4000/api/v1/admin/reviews/:id *add review for products
exports.addReviews = async (req, res, next) => {
  const { rating, comment } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json([{ msg: "product not found" }]);
    }
    const user = await User.findById(req.user.id);

    const review = product.reviews.find((r) => r.user.toString() === req.user.id.toString());
    const userReview = { rating:Number(rating), comment, user: req.user.id, name: user.name };
    if (!review) {
      product.reviews.push(userReview);
      product.numOfRev = product.reviews.length;
    } else {
      product.reviews.forEach((r) => {
        if (r.user.toString() === req.user.id) {
          r.comment = comment;
          r.rating = rating;
        }
      });
    }
    product.ratings =
      product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(200).send({reviews:product.reviews,ratings:product.ratings});

  } catch (err) {

    res.status(500).send([{ succes: false, msg: "error" }]);

  }
};


//@http://localhost:4000/api/v1/admin/product/delete/:id *delete product
exports.getReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res
      .status(200)
      .json(
        {
          success: true,
          reviews: product.reviews
      }
        );
  } catch (err) {
    res.status(500).send([{ succes: false, msg: "error" }]);
  }
};

//@http://localhost:4000/api/v1/admin/product/delete/:name *search product
exports.getSearchProduct = async (req, res, next) => {
  const {search,price}=req.params
  
  try {
    const product = await Product.find({  name : {$regex:search}    });
    if(product.length===0){ return res.status(400).send([{msg:"not product with this name"}]) }

        res.status(200).send(product)
  } catch (err) {
    res.status(500).send([{ succes: false, msg: "error" }]);
  }
};