const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const { ObjectId } = require('mongodb');

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/products-by-categories", async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" },
        },
      },
      { 
        $project: { 
          _id: { $toString: "$_id" },
          name: { 
            name: "$_id",
            _id: { $toString: new ObjectId() }
          },
          products: 1 
        } 
      }
    ]);
    
    console.log('API Response Data:', JSON.stringify(products, null, 2));
    res.status(200).send({ data: products });
  } catch (err) {
    console.error('API Error:', err);
    res.status(400).send({ error: err });
  }
});

module.exports = router;
