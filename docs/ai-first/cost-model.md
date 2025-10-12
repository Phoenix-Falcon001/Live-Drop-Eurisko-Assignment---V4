# AI Cost Model – ShopLite

---

## Assumptions
- Model: GPT-4o-mini at $0.15/1K prompt tokens, $0.60/1K completion tokens
- Avg tokens in/out estimated:
  - Typeahead: 50 in, 20 out
  - Support assistant: 300 in, 200 out
- Requests/day:
  - Typeahead: 50,000
  - Support assistant: 1,000
- Cache hit rate:
  - Typeahead: 70%
  - Support assistant: 30%

---

## Calculation

**Formula**  
Cost/action = (tokens_in/1000 × prompt_price) + (tokens_out/1000 × completion_price)  
Daily cost = Cost/action × Requests/day × (1 - cache_hit_rate)

### Typeahead
- Cost/action = (50/1000 × 0.15) + (20/1000 × 0.60)  
= 0.0075 + 0.012 = **$0.0195**  
- Daily cost = 0.0195 × 50,000 × 0.3 = **$292.5/day**

### Support Assistant
- Cost/action = (300/1000 × 0.15) + (200/1000 × 0.60)  
= 0.045 + 0.12 = **$0.165**  
- Daily cost = 0.165 × 1,000 × 0.7 = **$115.5/day**

---

## Results
- Support assistant: Cost/action = **$0.165**, Daily = **$115.5**  
- Typeahead: Cost/action = **$0.0195**, Daily = **$292.5**

---

## Cost lever if over budget
- Typeahead: cache more aggressively (e.g., prefix cache up to 90%)  
- Support assistant: shorten FAQ context window to ≤200 tokens  
- Explore cheaper models (Llama 3.1 8B) for low-risk flows
