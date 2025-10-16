import Order from "../models/Order.js";

export const streamOrderStatus = (req, res) => {
  const { id } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Auto-progression simulation
  const simulateOrderProgress = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) return;

    const statusFlow = ["pending", "processing", "shipped", "delivered"];
    const currentIndex = statusFlow.indexOf(order.status);
    
    if (currentIndex === -1 || currentIndex >= statusFlow.length - 1) {
      return; // Already delivered or invalid status
    }

    const nextStatus = statusFlow[currentIndex + 1];
    const delays = [3000, 5000, 7000]; // 3s, 5s, 7s delays
    
    setTimeout(async () => {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { 
            status: nextStatus,
            updatedAt: new Date()
          },
          { new: true }
        );
        
        sendEvent({
          status: nextStatus,
          order: updatedOrder,
          message: `Order status updated to ${nextStatus}`
        });
        
        // Continue progression if not delivered
        if (nextStatus !== "delivered") {
          simulateOrderProgress(orderId);
        } else {
          // Close connection after delivery
          setTimeout(() => {
            res.end();
          }, 2000);
        }
      } catch (err) {
        console.error("Error updating order status:", err);
      }
    }, delays[currentIndex]);
  };

  // Initial status
  Order.findById(id)
    .then((order) => {
      if (!order) {
        sendEvent({ error: "Order not found" });
        res.end();
        return;
      }
      
      sendEvent({
        status: order.status,
        order: order,
        message: "Connected to order status stream"
      });
      
      // Start auto-progression if not already delivered
      if (order.status !== "delivered") {
        simulateOrderProgress(id);
      } else {
        // Close connection if already delivered
        setTimeout(() => {
          res.end();
        }, 2000);
      }
    })
    .catch((err) => {
      sendEvent({ error: err.message });
      res.end();
    });

  // Clean up on client disconnect
  req.on("close", () => {
    res.end();
  });
};