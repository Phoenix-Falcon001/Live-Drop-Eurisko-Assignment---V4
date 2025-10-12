# Ground Truth Q&A for Shoplite (20 items)

### Q01: How do I create a seller account on Shoplite?
**Expected retrieval context:** Document 08: Seller Account Setup and Management  
**Authoritative answer:** To create a seller account, visit the Shoplite seller registration page, supply business legal name, tax ID, representative contact, bank payout details, and upload required verification documents. The verification process typically takes 2–3 business days and may require additional documentation for certain categories.  
**Required keywords:** ["seller registration", "business verification", "2–3 business days"]  
**Forbidden content:** ["instant approval", "no verification required", "personal accounts"]

### Q02: What are Shoplite's return policies and how do I track my order status?
**Expected retrieval context:** Document 06: Return and Refund Policies + Document 05: Order Tracking and Delivery  
**Authoritative answer:** Shoplite has a 30-day return window for most categories (exceptions apply). Returns require an RMA and may require photos for certain categories. Order tracking shows per-shipment status events (in_transit, out_for_delivery, delivered) and uses carrier tracking numbers exposed on the order page.  
**Required keywords:** ["30-day return window", "order tracking", "return authorization"]  
**Forbidden content:** ["no returns accepted", "lifetime returns"]

### Q03: Can I save a credit card on Shoplite for one-click purchases?
**Expected retrieval context:** Document 04: Payment Methods and Security  
**Authoritative answer:** Yes. Shoplite stores payment tokens (not raw card data) via a PCI-compliant gateway which allows one-tap reorder and saved-card checkout. Raw PANs are never stored on Shoplite servers.  
**Required keywords:** ["tokenization", "PCI-compliant", "saved payment"]  
**Forbidden content:** ["we store card numbers", "raw card data stored"]

### Q04: How does Shoplite handle multi-seller checkouts?
**Expected retrieval context:** Document 03: Shopping Cart and Checkout Process  
**Authoritative answer:** Shoplite aggregates items from multiple sellers into a single checkout. Shipping is calculated per-seller and aggregated on the order summary, with separate shipments and tracking per seller when applicable.  
**Required keywords:** ["per-seller shipping", "aggregated total", "separate shipments"]  
**Forbidden content:** ["single shipment guaranteed for all sellers"]

### Q05: What should I do if my package shows 'exception' in tracking?
**Expected retrieval context:** Document 05: Order Tracking and Delivery + Document 11: Customer Support Procedures  
**Authoritative answer:** If tracking shows an exception, contact Shoplite support via the order page. The support workflow will collect evidence, contact the carrier, and initiate a claims process; sellers may be asked to assist.  
**Required keywords:** ["exception", "contact support", "claims workflow"]  
**Forbidden content:** ["automatic refund without investigation"]

### Q06: How are seller payouts scheduled and what affects settlement windows?
**Expected retrieval context:** Document 08: Seller Account Setup and Management + Document 10: Commission and Fee Structure  
**Authoritative answer:** Sellers choose a payout cadence (daily/weekly). Settlement windows may delay payouts to account for chargeback risk and refunds; commissions and fees are deducted in payout statements.  
**Required keywords:** ["payout schedule", "settlement window", "commissions deducted"]  
**Forbidden content:** ["instant payout after each sale"]

### Q07: What are Shoplite’s security guarantees for user data?
**Expected retrieval context:** Document 14: Security and Privacy Policies  
**Authoritative answer:** Shoplite encrypts PII at rest, applies least-privilege access controls, follows regional privacy laws (GDPR/CCPA where relevant), and allows data export or deletion requests per policy.  
**Required keywords:** ["encrypts PII", "GDPR", "data deletion request"]  
**Forbidden content:** ["we share PII freely"]

### Q08: How do promotional codes work for multi-item carts?
**Expected retrieval context:** Document 15: Promotional Codes and Discounts + Document 03: Shopping Cart and Checkout Process  
**Authoritative answer:** Promo codes apply per their configuration—line-item discounts, order-level discounts, or free shipping. Stackability and eligibility (min spend, segments) are validated at checkout.  
**Required keywords:** ["line-item", "order-level", "stackability"]  
**Forbidden content:** ["always stackable"]

### Q09: What causes a return to be non-eligible?
**Expected retrieval context:** Document 06: Return and Refund Policies  
**Authoritative answer:** Non-eligible returns usually include perishable goods, custom-made items, or items outside the return window. Some categories require additional photo proof and may be excluded per seller policy.  
**Required keywords:** ["perishable", "custom-made", "outside return window"]  
**Forbidden content:** ["all items always returnable"]

### Q10: How are product reviews moderated?
**Expected retrieval context:** Document 07: Product Reviews and Ratings  
**Authoritative answer:** Reviews are filtered via automated spam/profanity checks; flagged content gets manual review. Verified purchase labels are applied when an order exists. Sellers may publicly respond to reviews.  
**Required keywords:** ["automated filters", "manual review", "verified purchase"]  
**Forbidden content:** ["reviews are unmoderated"]

### Q11: How do I update inventory in bulk?
**Expected retrieval context:** Document 09: Inventory Management for Sellers + Document 13: API Documentation for Developers  
**Authoritative answer:** Use CSV bulk upload in the seller dashboard or the Inventory API to push batch updates. Conflict resolution favors the most recent timestamp unless manually overridden.  
**Required keywords:** ["CSV upload", "Inventory API", "timestamp resolution"]  
**Forbidden content:** ["only single-item updates allowed"]

### Q12: What happens when a buyer disputes a charge?
**Expected retrieval context:** Document 04: Payment Methods and Security  
**Authoritative answer:** Shoplite collects evidence and responds to the card issuer; disputed funds may be held until resolution and chargeback deductions may be applied. Merchants are notified and can provide evidence.  
**Required keywords:** ["chargeback", "evidence collection", "funds held"]  
**Forbidden content:** ["we always side with buyer"]

### Q13: Can mobile users scan barcodes for price checks?
**Expected retrieval context:** Document 12: Mobile App Features  
**Authoritative answer:** Yes — the Shoplite mobile app includes a barcode scanner to check product price and availability; scanner uses camera permissions and displays matching SKUs.  
**Required keywords:** ["barcode scanner", "mobile app", "price check"]  
**Forbidden content:** ["barcode scanning not supported"]

### Q14: How do webhooks work for order events?
**Expected retrieval context:** Document 13: API Documentation for Developers  
**Authoritative answer:** Webhooks notify subscribed endpoints for order lifecycle events (created, shipped, delivered). Payloads are signed and include order id and event metadata. Retries follow an exponential backoff policy.  
**Required keywords:** ["signed payloads", "order lifecycle", "retries"]  
**Forbidden content:** ["webhooks are instantaneous with no retries"]

### Q15: What is Shoplite’s policy for incentivized reviews?
**Expected retrieval context:** Document 07: Product Reviews and Ratings  
**Authoritative answer:** Incentivized or paid reviews are prohibited. Any such behavior triggers removal of reviews and may lead to seller sanctions. Verified reviews must reflect actual purchases.  
**Required keywords:** ["prohibited", "removal", "seller sanctions"]  
**Forbidden content:** ["incentives allowed"]

### Q16: How long will it take for seller verification?
**Expected retrieval context:** Document 01: Shoplite User Registration Process + Document 08: Seller Account Setup and Management  
**Authoritative answer:** The seller verification process generally completes in 2–3 business days but can take longer if manual review or additional documents are required.  
**Required keywords:** ["2–3 business days", "manual review", "additional documents"]  
**Forbidden content:** ["instant verification"]

### Q17: What analytics are available to sellers about returns?
**Expected retrieval context:** Document 09: Inventory Management for Sellers + Document 06: Return and Refund Policies  
**Authoritative answer:** Sellers see return rates per SKU, reasons for returns, days-to-return metrics, and reports that offer insight into restocking and product issues.  
**Required keywords:** ["return rates", "reasons for returns", "SKU-level analytics"]  
**Forbidden content:** ["no analytics available"]

### Q18: If an item is lost in transit, how is it handled?
**Expected retrieval context:** Document 05: Order Tracking and Delivery + Document 11: Customer Support Procedures  
**Authoritative answer:** Customers open a claim via support, which gathers evidence and coordinates with carrier and seller. Outcomes may include refund or reship depending on investigation results and seller policy.  
**Required keywords:** ["lost in transit", "claim", "refund or reship"]  
**Forbidden content:** ["automatic full refund without claim"]

### Q19: Can sellers have custom commission arrangements?
**Expected retrieval context:** Document 10: Commission and Fee Structure  
**Authoritative answer:** High-volume sellers can negotiate custom fee structures; standard sellers follow published commission rates per category. Changes are contractually documented.  
**Required keywords:** ["custom fee arrangements", "contract", "category rates"]  
**Forbidden content:** ["no negotiation possible"]

### Q20: What measures does Shoplite take for privacy compliance?
**Expected retrieval context:** Document 14: Security and Privacy Policies  
**Authoritative answer:** Shoplite follows regional regulations (GDPR/CCPA), minimizes PII, offers data export/deletion requests, encrypts sensitive data, and conducts vendor security assessments.  
**Required keywords:** ["GDPR", "data export", "encrypts sensitive data"]  
**Forbidden content:** ["we do not comply with privacy laws"]
