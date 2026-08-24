# Fill these in

**Answered so far: phone ✅, premises ✅, ACN ✅ (already live). Remaining: 12 items.**

Write your answer on the `➜` line under each item. Leave anything you don't know — partial is fine and I'll wire in whatever is filled. Most items repeat across several pages; you answer **once** and I'll propagate.

Nothing here was guessed. Every one of these is a fact only you have.

---

## 🔴 BLOCKERS — these stop local SEO working at all

### 1. Phone number ✅ DONE
**`0401 821 848`** — live on all 10 pages as a `tel:+61401821848` link, and in the `Organization` schema with a `ContactPoint`. Stored once in `_facts.py`.

*On registering a local number:* not worth it. Australia has four area codes, so Rockhampton, Gladstone, Yeppoon, Emerald, Biloela **and** Brisbane are all `07` — there is no per-town number to register. GBP accepts mobiles with no ranking penalty, and NAP consistency (one number, identical everywhere) matters far more than the prefix. If you later want the regional look, get **one** `07 49` number that diverts to the mobile, change the three lines in `_facts.py`, rebuild, and update GBP the same day. Never run two numbers at once.

### 2. ABN — still outstanding (9 instances)
ACN **700 798 509** is confirmed and already rendering in every footer's legal line — that was never missing.

**ACN and ABN are different numbers.** For a company the ABN is your ACN with a two-digit prefix, 11 digits total. I will not guess the prefix — a derived one was checked earlier in this project and ABR returned no record. Look it up free at **abr.business.gov.au** and paste the 11 digits.

➜ **ABN:**

### 3. Street address ✅ ANSWERED — no premises
Recorded as a **service-area business** in `_facts.py`. No page claims an address and no page emits a `LocalBusiness` node, which is correct: that type needs a `postalAddress` to be eligible for rich results, and asserting one that does not exist is worse than asserting nothing.

**Still needed from you when you create the GBP:** Google requires a real address behind the scenes even for a service-area business — it is used for verification and then hidden. Your home or registered office is fine. Choose **"I deliver goods and services to my customers"** and set the service area to the Central Queensland towns.

### 4. Trading hours
Also needed for GBP. Not on the site anywhere yet.

➜ **HOURS:**

---

## 🟠 DELIVERY — the substance of the location pages

Right now each town page says "we deliver here" and then visibly admits it doesn't know what that costs or how long it takes. That's the weakest part of every page, and it's the question a buyer in Emerald actually has.

| # | Town | Instances | Your answer |
|---|---|---|---|
| 5 | **Rockhampton** | 3 | ➜ cost: ______ lead time: ______ |
| 6 | **Gladstone** | 3 | ➜ cost: ______ lead time: ______ |
| 7 | **Yeppoon / Capricorn Coast** | 3 | ➜ cost: ______ lead time: ______ |
| 8 | **Emerald** | 3 | ➜ cost: ______ lead time: ______ |
| 9 | **Biloela** | 3 | ➜ cost: ______ lead time: ______ |

### 10. Full delivery area (hub page, 2 instances)
Which towns/postcodes do you actually deliver to? Anywhere you'd decline?

➜ **DELIVERY AREA:**

### 11. Standard lead time, order → delivery (2 instances)
The general figure, separate from the per-town freight above.

➜ **LEAD TIME:**

### 12. Damage, returns and replacement policy (2 instances)
Specifically: what happens if a panel arrives damaged 270 km inland, and who wears the cost.

➜ **POLICY:**

---

## 🟡 PRIVACY — needed before analytics can be switched on

The measurement layer is built but **deliberately inert**. It must not go live until the privacy policy is finished, because the policy is what makes the tracking lawful.

### 13. Data residency, retention period, other processors
Netlify hosts the site and database. Anything else touching customer data — email provider, CRM, accounting, freight company?

➜ **PROCESSORS / RETENTION:**

### 14. Privacy contact, postal address, complaint handling
Who handles a privacy request, and where does a complaint go?

➜ **PRIVACY CONTACT:**

---

## ⚖️ LEGAL — I have deliberately not drafted these

Both pages exist and are `noindex`. I won't write either: they're consumer-law sensitive, and your handoff §6 says not to draft the warranty speculatively. Same logic applies to terms.

### 15. Terms of sale
Needs at minimum: payment and deposit terms · delivery and freight · lead times · cancellation and variation · risk and title on delivery · **who is responsible for measurements**, and what happens when a customer's dimensions are wrong.

That last one matters more than the rest combined — cut-to-size means the customer's numbers drive the cut, so the liability question is real and it will come up.

➜ **TERMS:** (or: "getting a lawyer to do it")

### 16. Warranty terms + ACL wording
Needs: warranty period by component (carcass / doors / hardware / benchtop) · what is and isn't covered · claim process · the mandatory Australian Consumer Law text.

➜ **WARRANTY:** (or: "getting a lawyer to do it")

---

## 🔵 DECISIONS — not placeholders, but they block work

### 17. Where do you actually serve?
The site said three different things before I touched it:

| Source | Claim |
|---|---|
| Old page title | Gold Coast & Brisbane |
| Footer | Brisbane · Sunshine Coast · Rockhampton |
| Handoff | Brisbane / Sunshine Coast / Rockhampton |
| Testimonials | Rockhampton, Gladstone, Caboolture |

**Gold Coast appeared in the title and nowhere else in the business**, so I dropped it and made the title state-level. Confirm the real list — it decides which location pages are honest to publish, and whether Sunshine Coast deserves its own set.

➜ **SERVICE AREA:**

### 18. GA4 measurement ID
Goes in `js/analytics.js` → `MEASUREMENT_ID`. Create a GA4 property and paste the `G-XXXXXXXXXX`. **Do this after #13 and #14, not before.**

➜ **MEASUREMENT ID:**

### 19. Board substrate and edge banding
Open in your handoff as `[BOARD]`, `[BOARD SPEC]`, `[EDGE]`. Not on any live page right now, but it blocks the spec content — and it's a genuine differentiator, because most competitors won't publish theirs.

➜ **BOARD:**
➜ **EDGE BANDING:**

---

## ⚠️ One thing to know before anyone runs a build

`_build.py` regenerates `index.html` from the design-tool export, and **it still contains the old placeholders** — `[SIZE]`, `[PRICE]`, `[BRAND]`, `[HINGE + RUNNER BRAND]`, `[STONE / LAMINATE OPTIONS]`, `[LEAD TIME]`.

The shipped `index.html` is clean (0 placeholders) because it's been hand-edited well past that generator. **Running `python _build.py` would reintroduce every one of those placeholders and wipe the entire SEO head** — title, canonical, Open Graph, structured data, image attributes, tracking hooks.

The two new generators are safe to re-run any time:

```bash
python _build_locations.py && python _build_legal.py
```

`_build.py` is the one to leave alone until it's reconciled.

---

## How to give me the answers

Easiest: edit this file, fill the `➜` lines, tell me it's done. Or just paste them in chat in any format — numbered against the list is plenty.

I'll wire them into the generators so the values live in one place and every page picks them up on rebuild, rather than being pasted into 43 spots by hand.
