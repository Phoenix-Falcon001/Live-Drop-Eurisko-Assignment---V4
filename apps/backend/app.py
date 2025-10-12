from flask import Flask, request, jsonify
from flask_cors import CORS
import re

print("🚀 Starting Shoplite RAG API (Simple Version)...")

app = Flask(__name__)
CORS(app)

# Shoplite Knowledge Base (from Week 3 assignment)
docs = [
    {
        "id": 1,
        "title": "User Registration",
        "content": "Shoplite User Registration: Users can create accounts with email verification. Buyer accounts are free while seller accounts require business verification and take 2-3 business days to approve. All users must agree to terms of service during registration.",
        "keywords": ["register", "account", "sign up", "verification", "seller", "buyer"]
    },
    {
        "id": 2, 
        "title": "Product Search",
        "content": "Product Search and Filtering: Shoplite offers advanced search with filters by price range, category, seller rating, and delivery time. The search algorithm prioritizes relevance based on product title, description, and customer reviews.",
        "keywords": ["search", "filter", "find products", "category", "price"]
    },
    {
        "id": 3,
        "title": "Shopping Cart",
        "content": "Shopping Cart Features: Users can add items from multiple sellers, apply promo codes, and save items for later. Cart contents persist for 30 days for logged-in users. Maximum 50 items per cart with quantity adjustments available.",
        "keywords": ["cart", "shopping cart", "add to cart", "promo code", "save"]
    },
    {
        "id": 4,
        "title": "Payment Methods", 
        "content": "Payment Methods: Shoplite accepts credit/debit cards, PayPal, and Shoplite Wallet. All payments are encrypted and processed securely. Refunds are processed to original payment method within 5-7 business days.",
        "keywords": ["payment", "pay", "credit card", "paypal", "refund"]
    },
    {
        "id": 5,
        "title": "Order Tracking",
        "content": "Order Tracking: Customers receive tracking numbers via email once orders ship. Real-time tracking available for partnered carriers. Support contacts carrier directly if delivery exceptions occur.",
        "keywords": ["track", "tracking", "order status", "delivery", "ship"]
    },
    {
        "id": 6,
        "title": "Return Policy",
        "content": "Return Policy: 30-day return window for most items, excluding personalized products. Items must be unused with original packaging. Return shipping is free for defective items, otherwise customer-paid.",
        "keywords": ["return", "refund", "30-day", "policy", "exchange"]
    },
    {
        "id": 7,
        "title": "Seller Account",
        "content": "Seller Account Management: Sellers can list products, manage inventory, set shipping options, and view sales analytics. Commission rates vary by category from 8-15%. Payouts processed bi-weekly.",
        "keywords": ["seller", "vendor", "commission", "inventory", "payout"]
    },
    {
        "id": 8,
        "title": "Customer Support",
        "content": "Customer Support: Available via email, chat, and phone. Average response time: 2 hours for chat, 24 hours for email. Support can assist with orders, returns, and account issues.",
        "keywords": ["support", "help", "contact", "customer service", "assistance"]
    },
    {
        "id": 9,
        "title": "Product Reviews",
        "content": "Product Reviews: Customers can leave 1-5 star ratings and detailed reviews after purchase. Reviews are moderated for inappropriate content. Sellers can respond to reviews professionally.",
        "keywords": ["review", "rating", "feedback", "comment", "stars"]
    },
    {
        "id": 10,
        "title": "Shipping Options",
        "content": "Shipping Options: Standard shipping (3-7 days), Express (1-3 days), and Same-day delivery in select areas. Shipping costs calculated based on weight, distance, and delivery speed.",
        "keywords": ["shipping", "delivery", "express", "standard", "same-day"]
    }
]

def keyword_search(query, k=3):
    """Simple keyword-based search"""
    query_lower = query.lower()
    scores = []
    
    for doc in docs:
        score = 0
        # Check title and keywords
        title_score = sum(1 for word in query_lower.split() if word in doc["title"].lower())
        keyword_score = sum(1 for word in query_lower.split() if word in doc["keywords"])
        content_score = sum(1 for word in query_lower.split() if word in doc["content"].lower())
        
        total_score = title_score * 3 + keyword_score * 2 + content_score
        scores.append(total_score)
    
    # Get top k documents
    top_indices = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:k]
    return [docs[i] for i in top_indices if scores[i] > 0]

def generate_answer(query, context_docs):
    """Generate answer based on retrieved context"""
    if not context_docs:
        return {
            "answer": "I don't have enough information to answer that question about Shoplite. Please contact customer support for specific inquiries.",
            "sources": [],
            "status": "success"
        }
    
    # Combine relevant information
    answers = []
    for doc in context_docs:
        answers.append(f"{doc['title']}: {doc['content']}")
    
    combined_answer = " ".join(answers)
    
    # Simple summarization
    if len(combined_answer) > 300:
        combined_answer = combined_answer[:300] + "..."
    
    return {
        "answer": f"Based on Shoplite documentation: {combined_answer}",
        "sources": [doc["title"] for doc in context_docs],
        "status": "success"
    }

@app.route("/")
def home():
    return "🚀 Shoplite RAG API is running!"

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy", 
        "version": "simple-keyword",
        "documents": len(docs),
        "message": "Using keyword-based search (no embeddings required)"
    })

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        query = data.get("query", "")

        if not query:
            return jsonify({"error": "Missing 'query' field"}), 400

        print(f"📥 Received query: {query}")

        # Simple search pipeline
        retrieved_docs = keyword_search(query, k=2)
        result = generate_answer(query, retrieved_docs)

        print(f"📤 Found {len(retrieved_docs)} relevant documents")

        return jsonify({
            "query": query,
            "answer": result["answer"],
            "sources": result["sources"],
            "status": result["status"]
        })

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/docs", methods=["GET"])
def list_docs():
    """Endpoint to list all documents (for debugging)"""
    return jsonify({
        "documents": [
            {"id": doc["id"], "title": doc["title"], "keywords": doc["keywords"]}
            for doc in docs
        ]
    })

@app.route("/test", methods=["GET"])
def test_queries():
    """Test endpoint with sample queries"""
    test_queries = [
        "How do I create a seller account?",
        "What is your return policy?",
        "What payment methods do you accept?",
        "How does order tracking work?",
        "What are the shipping options?"
    ]
    
    results = []
    for query in test_queries:
        retrieved_docs = keyword_search(query, k=2)
        result = generate_answer(query, retrieved_docs)
        results.append({
            "query": query,
            "answer": result["answer"],
            "sources": result["sources"]
        })
    
    return jsonify({"test_results": results})

if __name__ == '__main__':
    print("📍 Available Endpoints:")
    print("   - GET  /health")
    print("   - POST /chat") 
    print("   - GET  /docs")
    print("   - GET  /test")
    print("   - GET  /")
    print("\n💬 Example queries:")
    print("   • 'How do I create a seller account?'")
    print("   • 'What is your return policy?'")
    print("   • 'What payment methods do you accept?'")
    print("   • 'How does order tracking work?'")
    app.run(host="0.0.0.0", port=5000, debug=True)