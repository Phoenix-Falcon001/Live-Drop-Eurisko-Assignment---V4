export class IntentClassifier {
  static classify(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Policy questions
    if (this.matchesPolicyQuestion(input)) {
      return 'policy_question';
    }
    
    // Order status
    if (this.matchesOrderStatus(input)) {
      return 'order_status';
    }
    
    // Product search
    if (this.matchesProductSearch(input)) {
      return 'product_search';
    }
    
    // Complaints
    if (this.matchesComplaint(input)) {
      return 'complaint';
    }
    
    // Chitchat
    if (this.matchesChitchat(input)) {
      return 'chitchat';
    }
    
    // Violation
    if (this.matchesViolation(input)) {
      return 'violation';
    }
    
    // Off-topic
    if (this.matchesOffTopic(input)) {
      return 'off_topic';
    }
    
    return 'policy_question'; // Default fallback
  }
  
  static matchesPolicyQuestion(input) {
    const keywords = [
      'return', 'refund', 'policy', 'warranty', 'shipping', 
      'delivery', 'exchange', 'privacy', 'terms', 'condition',
      'how long', 'when can', 'what if', 'do you', 'can i'
    ];
    return keywords.some(keyword => input.includes(keyword));
  }
  
  static matchesOrderStatus(input) {
    const keywords = [
      'order', 'track', 'status', 'where is', 'when will',
      'delivery', 'shipped', 'processing', 'pending'
    ];
    const orderPattern = /order\s+(#|number)?\s*(\w+)/i;
    return keywords.some(keyword => input.includes(keyword)) || orderPattern.test(input);
  }
  
  static matchesProductSearch(input) {
    const keywords = [
      'product', 'item', 'looking for', 'find', 'search',
      'camera', 'headphone', 'watch', 'shirt', 'bottle',
      'what do you have', 'show me', 'recommend'
    ];
    return keywords.some(keyword => input.includes(keyword));
  }
  
  static matchesComplaint(input) {
    const keywords = [
      'problem', 'issue', 'complaint', 'wrong', 'broken',
      'not working', 'damaged', 'angry', 'upset', 'disappointed',
      'terrible', 'awful', 'horrible'
    ];
    return keywords.some(keyword => input.includes(keyword));
  }
  
  static matchesChitchat(input) {
    const keywords = [
      'hello', 'hi', 'hey', 'how are you', 'good morning',
      'good afternoon', 'good evening', 'thanks', 'thank you',
      'please', 'sorry', 'your name', 'who are you'
    ];
    return keywords.some(keyword => input.includes(keyword));
  }
  
  static matchesViolation(input) {
    const violations = [
      'stupid', 'idiot', 'hate', 'suck', 'bullshit',
      'damn', 'hell', 'fuck', 'shit', 'asshole'
    ];
    return violations.some(violation => input.includes(violation));
  }
  
  static matchesOffTopic(input) {
    const offTopics = [
      'weather', 'sports', 'politics', 'movie', 'music',
      'celebrity', 'news', 'joke', 'story', 'tell me about'
    ];
    return offTopics.some(topic => input.includes(topic));
  }
}