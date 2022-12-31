import express from "express";
import {
  fetchOrders,
  addOrderItems,
  fetchOrderById,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, fetchOrders);
router.get("/:id", protect, fetchOrderById);
export default router;
