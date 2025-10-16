import mongoose from 'mongoose';
import { connectDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const customers = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1-555-0101",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    }
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1-555-0102",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    }
  },
  {
    name: "Mike Chen",
    email: "mike.chen@example.com",
    phone: "+1-555-0103",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    }
  },
  {
    name: "Demo User",
    email: "demo@example.com",
    phone: "+1-555-0000",
    address: {
      street: "999 Test Blvd",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA"
    }
  }
];

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 129.99,
    category: "Electronics",
    tags: ["audio", "wireless", "bluetooth"],
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 25
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this advanced smartwatch",
    price: 199.99,
    category: "Electronics",
    tags: ["wearable", "fitness", "smartwatch"],
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 15
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt",
    price: 24.99,
    category: "Clothing",
    tags: ["clothing", "organic", "casual"],
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 50
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Keep your drinks hot or cold for hours with this insulated bottle",
    price: 34.99,
    category: "Accessories",
    tags: ["eco-friendly", "hydration", "insulated"],
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    stock: 30
  },
  {
    name: "Professional Camera Backpack",
    description: "Durable backpack designed for photographers with padded compartments",
    price: 89.99,
    category: "Accessories",
    tags: ["camera", "travel", "professional"],
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 12
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Customer.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    
    console.log('🗑️ Cleared existing data');
    
    // Insert customers
    const createdCustomers = await Customer.insertMany(customers);
    console.log(`✅ Added ${createdCustomers.length} customers`);
    
    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Added ${createdProducts.length} products`);
    
    // Create orders - using the correct status values from your Order model
    const orders = [
      {
        customerId: createdCustomers[0]._id, // John Smith
        items: [
          {
            productId: createdProducts[0]._id,
            name: createdProducts[0].name,
            price: createdProducts[0].price,
            quantity: 1
          },
          {
            productId: createdProducts[2]._id,
            name: createdProducts[2].name,
            price: createdProducts[2].price,
            quantity: 2
          }
        ],
        totalAmount: 129.99 + (24.99 * 2),
        status: "PENDING", // Using uppercase as per your model
        shippingAddress: createdCustomers[0].address
      },
      {
        customerId: createdCustomers[3]._id, // Demo User
        items: [
          {
            productId: createdProducts[1]._id,
            name: createdProducts[1].name,
            price: createdProducts[1].price,
            quantity: 1
          }
        ],
        totalAmount: 199.99,
        status: "PROCESSING", // Using uppercase as per your model
        shippingAddress: createdCustomers[3].address
      },
      {
        customerId: createdCustomers[3]._id, // Demo User - second order
        items: [
          {
            productId: createdProducts[3]._id,
            name: createdProducts[3].name,
            price: createdProducts[3].price,
            quantity: 1
          },
          {
            productId: createdProducts[4]._id,
            name: createdProducts[4].name,
            price: createdProducts[4].price,
            quantity: 1
          }
        ],
        totalAmount: 34.99 + 89.99,
        status: "SHIPPED", // Using uppercase as per your model
        shippingAddress: createdCustomers[3].address,
        carrier: "UPS",
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
      }
    ];
    
    const createdOrders = await Order.insertMany(orders);
    console.log(`✅ Added ${createdOrders.length} orders`);
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('📧 Demo user email: demo@example.com');
    console.log('📦 Demo user has 2 orders for testing');
    
    // Print the order IDs for testing
    console.log('\n📋 Order IDs for testing:');
    createdOrders.forEach((order, index) => {
      console.log(`Order ${index + 1}: ${order._id} (Status: ${order.status})`);
    });
    
    // Print demo user ID for testing
    const demoUser = createdCustomers.find(c => c.email === 'demo@example.com');
    console.log(`👤 Demo user ID: ${demoUser._id}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    
    // More detailed error info
    if (error.errors) {
      Object.keys(error.errors).forEach(field => {
        console.log(`Field error: ${field} - ${error.errors[field].message}`);
      });
    }
    
    process.exit(1);
  }
};

seedDatabase();