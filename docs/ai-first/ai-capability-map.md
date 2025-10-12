# AI Capability Map – ShopLite

| Capability | Intent (user) | Inputs (this sprint) | Risk 1–5 (tag) | p95 ms | Est. cost/action | Fallback | Selected |
|---|---|---|---|---:|---:|---|:---:|
| Smart Search Typeahead | Quickly find SKUs as I type | Product catalog titles & embeddings | 2 | 300 | $0.002 | Default keyword search | ✅ |
| Support Assistant | Get instant answers to order & policy questions | FAQ markdown, order-status API | 3 | 1200 | $0.02 | Escalate to live support | ✅ |
| Personalized Recommendations | Discover products I may like | Past purchases, SKU metadata | 4 | 800 | $0.015 | Default “bestsellers” list |   |
| Review Summarizer | Read condensed highlights of product reviews | Customer reviews corpus | 3 | 1500 | $0.01 | Show raw reviews |   |

---
