import React, { useState, useRef, useEffect } from 'react';

const SupportAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{
    text: string; 
    isUser: boolean;
    timestamp: Date;
  }>>([
    { 
      text: "Hello! I'm your AI support assistant. I can help you with product information, shipping, returns, and general inquiries. How can I assist you today?", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { 
      text: userMessage, 
      isUser: true, 
      timestamp: new Date() 
    }]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        hello: "Hello! 👋 Welcome to TechStore support. I'm here to help you with any questions about our products, shipping, returns, or technical support. What would you like to know?",
        hi: "Hi there! 😊 How can I assist you today? Feel free to ask about our products, shipping policies, or anything else!",
        shipping: "🚚 **Shipping Information:**\n• Standard: 3-5 business days ($4.99)\n• Express: 2 business days ($15.99)\n• Free shipping on orders over $50\n• International shipping available",
        return: "📦 **Return Policy:**\n• 30-day return window\n• Items must be in original condition\n• Free returns for defective products\n• Refund processed within 5-7 business days",
        warranty: "🔧 **Warranty Information:**\n• 1-year manufacturer warranty on all products\n• Extended warranties available\n• Technical support included\n• Contact support@techstore.com for claims",
        payment: "💳 **Payment Methods:**\n• Credit/Debit Cards (Visa, MasterCard, Amex)\n• PayPal\n• Apple Pay\n• Google Pay\n• Bank transfers for large orders",
        contact: "📞 **Contact Support:**\n• Email: support@techstore.com\n• Phone: 1-800-TECH-HELP\n• Live Chat: Available 24/7\n• Response time: < 2 hours",
        hours: "🕒 **Business Hours:**\n• Monday-Friday: 9AM-9PM EST\n• Saturday: 10AM-6PM EST\n• Sunday: 12PM-5PM EST\n• 24/7 automated support available",
        default: "Thank you for your question! I understand you're asking about \"" + userMessage + "\". Our support team can provide detailed assistance with this. Would you like me to connect you with a human agent, or is there anything else I can help you with in the meantime? 😊"
      };

      let response = responses.default;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi ')) response = responses.hello;
      else if (lowerMessage.includes('ship') || lowerMessage.includes('deliver')) response = responses.shipping;
      else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) response = responses.return;
      else if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) response = responses.warranty;
      else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) response = responses.payment;
      else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) response = responses.contact;
      else if (lowerMessage.includes('hour') || lowerMessage.includes('time')) response = responses.hours;

      setMessages(prev => [...prev, { 
        text: response, 
        isUser: false, 
        timestamp: new Date() 
      }]);
      setLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="support-assistant-enhanced">
      <div className="chat-header">
        <div className="chat-title">
          <div className="assistant-avatar">🤖</div>
          <div className="title-content">
            <h2>TechStore Support Assistant</h2>
            <p>Online • Ready to help</p>
          </div>
        </div>
        <div className="chat-status">
          <div className="status-indicator"></div>
          <span>Active now</span>
        </div>
      </div>

      <div className="chat-messages-container">
        <div className="messages-wrapper">
          {messages.map((message, index) => (
            <div key={index} className={`message-container ${message.isUser ? 'user-message' : 'ai-message'}`}>
              <div className="message-avatar">
                {message.isUser ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="message-text">{message.text}</div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message-container ai-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container-enhanced">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here... Ask about shipping, returns, products, or support"
            className="chat-input-enhanced"
            rows={3}
            disabled={loading}
          />
          <button 
            onClick={handleSend} 
            disabled={loading || !input.trim()}
            className="send-button-enhanced"
          >
            {loading ? (
              <div className="send-spinner"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor"/>
              </svg>
            )}
          </button>
        </div>
        <div className="input-hint">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default SupportAssistant;