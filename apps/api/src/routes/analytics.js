import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Daily revenue
router.get("/daily-revenue", async (req, res) => {
  try {
    const dailyRevenue = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" }
          },
          revenue: { $sum: "$totalAmount" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 } }
    ]);
    
    res.json(dailyRevenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;