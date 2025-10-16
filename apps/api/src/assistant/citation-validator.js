import fs from 'fs';
import path from 'path';

export class CitationValidator {
  constructor(knowledgeBasePath = '../docs/ground-truth.json') {
    this.knowledgeBase = this.loadKnowledgeBase(knowledgeBasePath);
  }
  
  loadKnowledgeBase(filePath) {
    try {
      const absolutePath = path.resolve(process.cwd(), filePath);
      const data = fs.readFileSync(absolutePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading knowledge base:', error);
      return [];
    }
  }
  
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
      : this.knowledgeBase.slice(0, 3); // Return first 3 if no category match
  }
}