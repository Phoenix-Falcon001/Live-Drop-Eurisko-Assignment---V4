#!/usr/bin/env python3
"""
Start script for Shoplite RAG API
"""

from app import app

if __name__ == '__main__':
    print("🚀 Starting Shoplite RAG API...")
    print("📍 Available Endpoints:")
    print("   - GET  /health")
    print("   - POST /chat")
    print("   - GET  /")
    print("\n💬 Try these example queries:")
    print("   • 'How do I create a seller account?'")
    print("   • 'What is your return policy?'") 
    print("   • 'What payment methods do you accept?'")
    app.run(host="0.0.0.0", port=5000, debug=True)