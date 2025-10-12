# RAG System Evaluation Checklist

This document lists retrieval, response-quality, and edge cases for manual testing.

## Retrieval Quality Tests (10 tests)
| Test ID | Question | Expected Documents | Pass Criteria |
|---------|----------|-------------------|---------------|
| R01 | How to register a seller? | Document 01, Document 08 | Top-3 retrieved contains Document 08 |
| R02 | Return policy timeframe | Document 06 | Top-2 retrieved contains Document 06 |
| R03 | How does multi-seller shipping work? | Document 03, Document 05 | Top-3 includes both documents |
| R04 | Promo code stacking | Document 15 | Document 15 in top-3 |
| R05 | Mobile barcode feature | Document 12 | Document 12 in top-3 |
| R06 | Webhook event structure | Document 13 | Document 13 in top-3 |
| R07 | Review moderation rules | Document 07 | Document 07 in top-3 |
| R08 | Inventory bulk update API | Document 09, Document 13 | Both in top-5 |
| R09 | Chargeback process | Document 04 | Document 04 in top-3 |
| R10 | Payout schedule details | Document 08, Document 10 | Both included in top-5 |

## Response Quality Tests (15 tests)
| Test ID | Question | Required Keywords | Forbidden Terms | Expected Behavior |
|---------|----------|-------------------|-----------------|-------------------|
| Q01 | Create seller account | ["seller registration", "2–3 business days"] | ["instant approval"] | Direct, step-by-step with timelines |
| Q02 | Return & track order | ["30-day return window","order tracking"] | ["no returns accepted"] | Multi-doc synthesis citing both docs |
| Q03 | Save card for checkout | ["tokenization","PCI-compliant"] | ["we store card numbers"] | Concise tech-safe answer |
| Q04 | Multi-seller checkout cost | ["per-seller shipping","aggregated"] | ["single shipment guaranteed"] | Explain per-seller shipping calc |
| Q05 | Lost package flow | ["claim","refund or reship"] | ["automatic refund"] | Explain claim & escalation workflow |
| Q06 | Developer webhook payload | ["signed payloads","retries"] | ["instantaneous"] | Provide webhook behavior |
| Q07 | How to bulk upload inventory | ["CSV upload","Inventory API"] | ["single-item only"] | Provide examples and endpoint name |
| Q08 | Refunds to original payment | ["refund","original payment method"] | ["cash only"] | Clarify processing and timing |
| Q09 | Promo code stacking rules | ["stackability","min-spend"] | ["always stackable"] | Show example eligibility check |
| Q10 | Return exceptions | ["perishable","custom-made"] | ["all items returnable"] | Provide conditional rules |
| Q11 | Mobile app features summary | ["barcode scanner","express checkout"] | ["no mobile support"] | Bulleted mobile features |
| Q12 | Security compliance | ["encrypts PII","GDPR"] | ["we share PII"] | State policy and user rights |
| Q13 | Review moderation | ["verified purchase","automated filters"] | ["unmoderated"] | Explain moderation lifecycle |
| Q14 | Seller payout breakdown | ["payout schedule","commissions deducted"] | ["instant payout"] | Illustrative example calculation |
| Q15 | Chargeback handling | ["evidence collection","funds held"] | ["we always side with buyer"] | Steps to collect evidence |

## Edge Case Tests (5 tests)
| Test ID | Scenario | Expected Response Type |
|---------|----------|------------------------|
| E01 | Question not in KB | Refusal with explanation and next steps |
| E02 | Ambiguous query | Clarification request (e.g., "Do you mean order or product?") |
| E03 | Conflicting docs (seller vs platform) | Prefer platform-level doc and explain conflict |
| E04 | PII in user's question | Ask to redact PII and only accept order-ID or masked info |
| E05 | Model returns hallucinated policy | Mark fail; assistant must refuse or cite sources only

---

## Manual Grading Guide
- Retrieval pass: expected docs in top-3 for single-doc answers and top-5 for multi-doc answers.
- Response pass: contains required keywords, no forbidden terms, cites correct documents.
- Overall acceptance: ≥80% tests pass for retrieval and response combined.
