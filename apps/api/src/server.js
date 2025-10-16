import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

dotenv.config();
const app = express();

// Connect to database first
await connectDB();

app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

console.log("🔄 Loading routes...");

// Import routes AFTER database connection
const customerRoutes = (await import("./routes/customers.js")).default;
const productRoutes = (await import("./routes/products.js")).default;
const orderRoutes = (await import("./routes/orders.js")).default;
const analyticsRoutes = (await import("./routes/analytics.js")).default;
const dashboardRoutes = (await import("./routes/dashboard.js")).default;
const assistantRoutes = (await import("./routes/assistant.js")).default; // ADD THIS LINE

// Use routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/assistant", assistantRoutes); // ADD THIS LINE

// Basic routes
app.get("/", (req, res) => res.send("API Running 🚀"));
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.url}` });
});

console.log("✅ All routes loaded successfully");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 Customers: http://localhost:${PORT}/api/customers?email=demo@example.com`);
  console.log(`📍 Assistant: http://localhost:${PORT}/api/assistant/chat`);
  console.log("Server is running - open a NEW Command Prompt to test!");
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});