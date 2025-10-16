import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Business metrics
router.get("/business-metrics", async (req, res) => {
  try {
    const metrics = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: "$totalAmount" }
        }
      }
    ]);
    
    const result = metrics[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 };
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;