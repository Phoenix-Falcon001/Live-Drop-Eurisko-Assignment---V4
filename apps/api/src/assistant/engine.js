import { IntentClassifier } from './intent-classifier.js';
import { FunctionRegistry } from './function-registry.js';
import { CitationValidator } from './citation-validator.js';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

export class AssistantEngine {
  constructor() {
    this.intentClassifier = new IntentClassifier();
    this.functionRegistry = new FunctionRegistry();
    this.citationValidator = new CitationValidator();
    this.config = this.loadConfig();
  }
  
  loadConfig() {
    try {
      const configPath = './docs/prompts.yaml';
      const fileContents = fs.readFileSync(configPath, 'utf8');
      return YAML.parse(fileContents);
    } catch (error) {
      console.error('Error loading config:', error);
      return {
        assistant: {
          identity: { name: 'Alex', role: 'Support Specialist' },
          behavior: { never_reveal: [], always: [] },
          intents: {}
        }
      };
    }
  }
  
  async processQuery(userInput, context = {}) {
    const intent = IntentClassifier.classify(userInput);
    const response = {
      text: '',
      intent,
      citations: [],
      functionsCalled: [],
      isValid: true
    };
    
    try {
      // Handle different intents
      switch (intent) {
        case 'policy_question':
          response.text = await this.handlePolicyQuestion(userInput);
          break;
          
        case 'order_status':
          response.text = await this.handleOrderStatus(userInput, context);
          break;
          
        case 'product_search':
          response.text = await this.handleProductSearch(userInput);
          break;
          
        case 'complaint':
          response.text = this.handleComplaint(userInput);
          break;
          
        case 'chitchat':
          response.text = this.handleChitchat(userInput);
          break;
          
        case 'off_topic':
          response.text = this.handleOffTopic(userInput);
          break;
          
        case 'violation':
          response.text = this.handleViolation(userInput);
          break;
          
        default:
          response.text = this.handleFallback(userInput);
      }
      
      // Validate citations
      const validation = this.citationValidator.validateCitations(response.text);
      response.citations = validation.validCitations;
      response.isValid = validation.isValid;
      
      return response;
      
    } catch (error) {
      response.text = "I apologize, but I'm having trouble processing your request. Please try again or contact our support team for assistance.";
      response.isValid = false;
      return response;
    }
  }
  
  async handlePolicyQuestion(userInput) {
    const relevantPolicies = this.citationValidator.findRelevantPolicies(userInput);
    
    if (relevantPolicies.length === 0) {
      return "I'd be happy to help with your question about our store policies. Could you please provide more specific details about what you'd like to know?";
    }
    
    const policy = relevantPolicies[0];
    return `${policy.answer} [${policy.id}] If you need more specific information, please let me know!`;
  }
  
  async handleOrderStatus(userInput, context) {
    // Extract order ID from input or use context
    let orderId = context.orderId;
    if (!orderId) {
      const orderMatch = userInput.match(/order\s+(#?)(\w+)/i);
      if (orderMatch) {
        orderId = orderMatch[2];
      }
    }
    
    if (!orderId) {
      return "I'd be happy to check your order status! Could you please provide your order number?";
    }
    
    const result = await this.functionRegistry.execute('getOrderStatus', { orderId });
    
    if (!result.success) {
      return `I couldn't find an order with ID ${orderId}. Please check the order number and try again.`;
    }
    
    const order = result.data;
    return `Your order #${orderId} is currently ${order.status.toLowerCase()}. It contains ${order.items} item(s) with a total of $${order.total}. [OrderStatus]`;
  }
  
  async handleProductSearch(userInput) {
    // Extract search query
    const searchMatch = userInput.match(/(?:looking for|find|search|show me)\s+(.+)/i);
    const query = searchMatch ? searchMatch[1] : userInput;
    
    const result = await this.functionRegistry.execute('searchProducts', { 
      query: query, 
      limit: 3 
    });
    
    if (!result.success || result.data.length === 0) {
      return `I couldn't find any products matching "${query}". Could you try different keywords or browse our product categories?`;
    }
    
    const products = result.data;
    let response = `I found ${products.length} product(s) matching "${query}":\n\n`;
    
    products.forEach((product, index) => {
      response += `${index + 1}. ${product.name} - $${product.price} (${product.inStock ? 'In Stock' : 'Out of Stock'})\n`;
    });
    
    response += `\nWould you like more details about any of these products?`;
    
    return response;
  }
  
  handleComplaint(userInput) {
    return "I'm really sorry to hear you're having issues. I understand this must be frustrating. Let me help resolve this for you. Could you please share more details about what happened?";
  }
  
  handleChitchat(userInput) {
    const { identity } = this.config.assistant;
    
    if (userInput.toLowerCase().includes('your name')) {
      return `My name is ${identity.name}, and I'm a ${identity.role} here at ${identity.company}. How can I assist you today?`;
    }
    
    if (userInput.toLowerCase().includes('how are you')) {
      return "I'm doing well, thank you for asking! I'm here to help you with any questions about our products, orders, or store policies. What can I assist you with today?";
    }
    
    return "Hello! I'm here to help you with any questions about our store, products, or your orders. What can I assist you with today?";
  }
  
  handleOffTopic(userInput) {
    return "I'm here to help with questions about our store, products, orders, and policies. If you have any questions about these topics, I'd be happy to assist!";
  }
  
  handleViolation(userInput) {
    return "I'm here to provide helpful and respectful assistance. I'd be happy to help with any questions about our store, products, or policies if you'd like to continue our conversation respectfully.";
  }
  
  handleFallback(userInput) {
    return "I'd be happy to help! Could you please let me know if you have questions about our products, order status, store policies, or anything else I can assist with?";
  }
}