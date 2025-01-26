const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://MERNProject:WuK4wEYFewiP7EdM@cluster0.0r089.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("products").insertOne(newProduct);
    newProduct.id = result.insertedId;
    console.log("Product inserted:", newProduct);
  } catch (error) {
    console.error("Error inserting product:", error);
    return res.status(500).json({ message: "Could not store data." });
  } finally {
    await client.close();
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
    console.log("Products retrieved:", products);
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.json({ message: "Could not retrieve products." });
  } finally {
    await client.close();
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
