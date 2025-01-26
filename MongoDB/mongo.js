const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://MERNProject:WuK4wEYFewiP7EdM@mernprojectcluster.0r089.mongodb.net/products_test?retryWrites=true&w=majority&appName=MERNProjectCluster";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection("products").insertOne(newProduct);
    // newProduct.id = result.insertedId;
  } catch (error) {
    return res.status(500).json({ message: "Could not store data." });
  } finally {
    client.close();
  }

  res.status(201).json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);

  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve products." });
  } finally {
    client.close();
  }

  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
