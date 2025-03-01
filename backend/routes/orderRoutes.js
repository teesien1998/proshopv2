import express from "express";
import {
  createOrders,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDeliver,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Regular User Route
router.post("/", protect, createOrders);
router.get("/mine", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.delete("/:id", protect, deleteOrder);
router.put("/:id/pay", protect, updateOrderToPaid);

// Admin User Route
router.get("/", protect, admin, getOrders);
router.put("/:id/deliver", protect, admin, updateOrderToDeliver);

export default router;
