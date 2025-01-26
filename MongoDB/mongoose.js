const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect(
    "mongodb+srv://MERNProject:WuK4wEYFewiP7EdM@mernprojectcluster.0r089.mongodb.net/products_test?retryWrites=true&w=majority&appName=MERNProjectCluster"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await createdProduct.save();

  res.json(result);
};

exports.createProduct = createProduct;
