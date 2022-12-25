const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");
const app = express();
const cors = require("cors");

dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running ");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 7000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT} in ${MODE} mode.`);
});
