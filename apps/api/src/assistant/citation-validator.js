import fs from 'fs';
import path from 'path';

export class CitationValidator {
  constructor(knowledgeBasePath = null) {
    // Use default knowledge base if file doesn't exist
    this.knowledgeBase = this.loadKnowledgeBase(knowledgeBasePath);
  }
  
  loadKnowledgeBase(filePath) {
    try {
      const actualPath = filePath || path.join(process.cwd(), 'docs', 'ground-truth.json');
      console.log('Looking for knowledge base at:', actualPath);
      
      if (!fs.existsSync(actualPath)) {
        console.log('Knowledge base not found, using default policies');
        return this.getDefaultPolicies();
      }
      
      const data = fs.readFileSync(actualPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      return this.getDefaultPolicies();
    }
  }
  
  getDefaultPolicies() {
    return [
      {
        "id": "Policy3.1",
        "question": "What is your return policy?",
        "answer": "Items can be returned within 30 days of purchase with original receipt. All items must be in original condition with tags attached. Refunds are processed within 5-7 business days.",
        "category": "returns",
        "lastUpdated": "2025-10-01T00:00:00Z"
      },
      {
        "id": "Shipping2.1", 
        "question": "What are your shipping options?",
        "answer": "We offer Standard (5-7 days, $5.99), Express (2-3 days, $12.99), and Overnight ($24.99) shipping. Free shipping on orders over $50.",
        "category": "shipping",
        "lastUpdated": "2025-10-01T00:00:00Z"
      },
      {
        "id": "Warranty4.1",
        "question": "What is your warranty policy?",
        "answer": "Electronics come with a 1-year manufacturer warranty. Clothing and accessories have a 90-day warranty against defects. Contact support with your order number to initiate a warranty claim.",
        "category": "warranty", 
        "lastUpdated": "2025-10-01T00:00:00Z"
      }
    ];
  }
  
  // ... keep the rest of your methods the same ...
  validateCitations(responseText) {
    const citationRegex = /\[([^\]]+)\]/g;
    const citations = [];
    let match;
    
    while ((match = citationRegex.exec(responseText)) !== null) {
      citations.push(match[1]);
    }
    
    const validCitations = [];
    const invalidCitations = [];
    
    for (const citation of citations) {
      const exists = this.knowledgeBase.some(item => item.id === citation);
      if (exists) {
        validCitations.push(citation);
      } else {
        invalidCitations.push(citation);
      }
    }
    
    return {
      isValid: invalidCitations.length === 0,
      validCitations,
      invalidCitations,
      citationCount: citations.length
    };
  }
  
  getPolicyById(policyId) {
    return this.knowledgeBase.find(item => item.id === policyId);
  }
  
  findRelevantPolicies(userQuery) {
    const query = userQuery.toLowerCase();
    const categoryKeywords = {
      'returns': ['return', 'refund', 'exchange', 'money back'],
      'shipping': ['ship', 'delivery', 'arrive', 'when will', 'track'],
      'warranty': ['warranty', 'guarantee', 'defect', 'broken'],
      'payment': ['payment', 'pay', 'credit card', 'paypal'],
      'privacy': ['privacy', 'data', 'information', 'secure']
    };
    
    let matchedCategory = null;
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        matchedCategory = category;
        break;
      }
    }
    
    return matchedCategory 
      ? this.knowledgeBase.filter(p => p.category === matchedCategory)
      : this.knowledgeBase.slice(0, 3);
  }
}