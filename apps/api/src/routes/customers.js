import express from "express";
const router = express.Router();

// Simple test endpoint - no database calls
router.get("/", (req, res) => {
  const { email } = req.query;
  
  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  // Mock response for testing
  res.json({
    id: "507f1f77bcf86cd799439011",
    name: "Demo User",
    email: email,
    phone: "+1-555-0000",
    address: {
      street: "999 Test Blvd",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA"
    },
    message: "Customer route is working!"
  });
});

export default router;