import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import cors from "cors";
import colors from "colors";

const app = express();
dotenv.config();

connectDB();

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
  console.log(`Sever is running on port ${PORT} in ${MODE} mode.`.yellow.bold);
});
