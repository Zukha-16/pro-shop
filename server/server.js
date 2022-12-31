import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMidleware.js";

const app = express();
app.use(express.json());
dotenv.config();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;
const MODE = process.env.NODE_ENV;

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT} in ${MODE} mode.`.yellow.bold);
});
