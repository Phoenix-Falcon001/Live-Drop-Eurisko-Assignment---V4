# AI Touchpoint Specs – ShopLite

---

## 1. Smart Search Typeahead

### Problem Statement
Users often abandon their shopping session when search results don’t match their intent. Keyword search misses synonyms, typos, or vague queries, leading to lower conversion. An AI-powered typeahead improves recall and precision by suggesting relevant SKUs instantly.

### Happy Path
1. User starts typing "wireless ea…" in the search box.  
2. Keystrokes trigger an API call.  
3. Cache lookup checks if this prefix is already embedded.  
4. If cache miss, system queries embedding index of product catalog.  
5. Top 5 SKU suggestions returned by semantic similarity.  
6. LLM reformulates into human-friendly suggestions (optional).  
7. UI displays ranked suggestions in dropdown.  
8. User clicks a suggestion → navigates to product page.  

### Grounding & Guardrails
- Source of truth: SKU catalog (titles, categories, embeddings).  
- Retrieval scope: product metadata only.  
- Max context: 200 tokens per query.  
- Refuse outside scope: no answers unrelated to products.  

### Human-in-the-loop
- Escalation: none (fully automated).  
- Reviewer: product team reviews embeddings weekly.  
- SLA: updates to catalog reflected in <24h.  

### Latency Budget
- Keystroke capture: 10 ms  
- Cache check: 20 ms  
- Embedding lookup: 50 ms  
- LLM re-rank/format: 200 ms  
- Network/overhead: 20 ms  
**Total ≤ 300 ms (p95)**  

### Error & Fallback Behavior
- On error: revert to keyword-based search suggestions.  
- If model unavailable: return most popular queries.  

### PII Handling
- No user PII leaves the app.  
- Logging: anonymized query terms only.  

### Success Metrics
- **Product**: CTR on suggestions = clicks / queries.  
- **Product**: Conversion uplift = purchases after search / baseline.  
- **Business**: Incremental revenue per 1k sessions = Δconversion × AOV.  

### Feasibility Note
Data is already available (catalog metadata). Embeddings can be precomputed with OpenAI or open-source models. Prototype step: build a cache + embedding index, benchmark latency on 10k SKUs.

---

## 2. Support Assistant

### Problem Statement
Customers frequently contact support for order status or policy clarification, driving up costs and slowing response times. An AI assistant can resolve FAQs instantly while escalating complex cases to humans.

### Happy Path
1. User opens chat on Help page.  
2. Types “Where is my order 12345?”  
3. System parses for order ID.  
4. API call retrieves order-status.  
5. Assistant grounds response with status + delivery estimate.  
6. If query is FAQ (e.g., refund policy), system retrieves answer from markdown.  
7. LLM generates response within scope.  
8. If confidence < threshold, escalate to human.  
9. User receives clear, concise answer.  
10. Resolution logged for metrics.  

### Grounding & Guardrails
- Source of truth: FAQ markdown, order-status API.  
- Retrieval scope: ShopLite docs only.  
- Max context: 1,500 tokens.  
- Refuse outside scope: no general chit-chat or advice.  

### Human-in-the-loop
- Escalation: low-confidence (<0.7) or ungrounded queries.  
- UI: “Connect to live agent” button.  
- Reviewer: support team.  
- SLA: human response within 2 minutes.  

### Latency Budget
- Query parse: 50 ms  
- Retrieval (API/FAQ): 200 ms  
- LLM response: 800 ms  
- Network/overhead: 100 ms  
**Total ≤ 1200 ms (p95)**  

### Error & Fallback Behavior
- On error: offer “Connect to support” immediately.  
- If model unavailable: direct link to Help Center.  

### PII Handling
- Order IDs only (not full personal data).  
- Redact email/phone numbers before sending to model.  
- Logging: store anonymized queries, no sensitive tokens.  

### Success Metrics
- **Product**: Resolution rate = resolved / total queries.  
- **Product**: Avg. first response time = ms per reply.  
- **Business**: Support contact deflection = (queries - escalations) / queries.  

### Feasibility Note
FAQ is already in markdown. Order-status API exists. Next prototype: wire retrieval into LLM prompt and test on 100 sample queries for accuracy.
See probe logs under [/docs/ai-first/probe/typeahead-demo.log](./probe/typeahead-demo.log).
See assistant sample conversation log under [/docs/ai-first/probe/support-sample.log](./probe/support-sample.log).

