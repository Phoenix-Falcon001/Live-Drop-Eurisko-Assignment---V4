import express from "express";
import { AssistantEngine } from "../assistant/engine.js";

const router = express.Router();
const assistant = new AssistantEngine();

router.post("/chat", async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    console.log(`🤖 Assistant received: ${message}`);
    const response = await assistant.processQuery(message, context);
    
    res.json({
      response: response.text,
      intent: response.intent,
      citations: response.citations,
      isValid: response.isValid,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("Assistant error:", error);
    res.status(500).json({ 
      error: "Sorry, I'm having trouble processing your request. Please try again.",
      intent: "error"
    });
  }
});

// Get assistant info
router.get("/info", (req, res) => {
  res.json({
    name: "Alex",
    role: "Customer Support Specialist",
    capabilities: [
      "Answer policy questions",
      "Check order status", 
      "Search products",
      "Handle complaints",
      "Provide shipping information"
    ],
    version: "1.0"
  });
});

export default router;