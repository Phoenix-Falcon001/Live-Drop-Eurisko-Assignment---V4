import React, { useState, useRef, useEffect } from 'react';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
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
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        hello: "Hello! 👋 I'm here to help with product information, shipping, returns, and more!",
        shipping: "🚚 Standard shipping takes 3-5 business days. Express shipping (2 days) is available for $15. Free shipping on orders over $50!",
        return: "📦 You can return items within 30 days of purchase. Items must be in original condition with tags attached.",
        price: "💰 We offer competitive pricing and price matching! Contact support for details.",
        warranty: "🔧 Most products come with 1-year manufacturer warranty. Extended warranties available.",
        payment: "💳 We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.",
        contact: "📞 Contact our support team at support@techstore.com or call 1-800-TECH-HELP",
        default: "I understand you're asking about: \"" + userMessage + "\". For detailed assistance, please contact our support team who can provide specific answers to your questions! 😊"
      };

      let response = responses.default;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) response = responses.hello;
      else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) response = responses.shipping;
      else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) response = responses.return;
      else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) response = responses.price;
      else if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) response = responses.warranty;
      else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) response = responses.payment;
      else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) response = responses.contact;

      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        className={`floating-chat-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '🤖'}
        <span className="chat-pulse"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <span>🤖</span>
            </div>
            <div className="chatbot-info">
              <h3>TechStore Assistant</h3>
              <p>Online • Ready to help</p>
            </div>
            <button className="close-chat" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message bot-message">
                <div className="message-content loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about products, shipping, returns..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              {loading ? '⏳' : '↑'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;