import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Customer from "../models/Customer.js";

export class FunctionRegistry {
  constructor() {
    this.functions = new Map();
    this.registerAll();
  }
  
  registerAll() {
    this.register('getOrderStatus', this.getOrderStatus.bind(this));
    this.register('searchProducts', this.searchProducts.bind(this));
    this.register('getCustomerOrders', this.getCustomerOrders.bind(this));
  }
  
  register(name, fn, schema = null) {
    this.functions.set(name, { fn, schema });
  }
  
  async execute(name, args) {
    const func = this.functions.get(name);
    if (!func) {
      throw new Error(`Function ${name} not found`);
    }
    
    try {
      const result = await func.fn(args);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  getAllSchemas() {
    const schemas = {};
    for (const [name, { schema }] of this.functions) {
      if (schema) {
        schemas[name] = schema;
      }
    }
    return schemas;
  }
  
  // Function implementations
  async getOrderStatus({ orderId }) {
    if (!orderId) {
      throw new Error('Order ID is required');
    }
    
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    
    return {
      orderId: order._id,
      status: order.status,
      total: order.totalAmount,
      items: order.items.length,
      createdAt: order.createdAt
    };
  }
  
  async searchProducts({ query, limit = 5 }) {
    if (!query) {
      throw new Error('Search query is required');
    }
    
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).limit(limit);
    
    return products.map(p => ({
      id: p._id,
      name: p.name,
      price: p.price,
      category: p.category,
      inStock: p.stock > 0
    }));
  }
  
  async getCustomerOrders({ email }) {
    if (!email) {
      throw new Error('Customer email is required');
    }
    
    const customer = await Customer.findOne({ email });
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    const orders = await Order.find({ customerId: customer._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    return orders.map(order => ({
      orderId: order._id,
      status: order.status,
      total: order.totalAmount,
      itemCount: order.items.length,
      date: order.createdAt
    }));
  }
}