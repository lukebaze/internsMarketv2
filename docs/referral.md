# Referral Program Design — InternsMarket

## 1. Program Overview

**Name:** InternsMarket Partner Program
**Model:** Recurring percentage commission (closest to Cloudways)
**Tagline:** "Earn while your team grows — 20% back, every month, for a year."
**Pricing context:** $29.99/intern/month, 3-day free trial, 11 AI interns available

---

## 2. Reward Rules

### Referrer (existing customer)
- **Commission:** 20% of each referred customer's monthly payment
- **Duration:** 12 months from referee's first paid subscription
- **Per intern:** $29.99 × 20% = **$6.00/intern/month**
- **Payout threshold:** Minimum $50 accumulated before payout
- **Payment methods:** PayPal or account credit (account credit has no minimum)
- **Payout schedule:** Monthly, on the 1st of each month

### Referee (new customer)
- **Incentive:** Extended 7-day free trial (vs standard 3-day)
- Applied automatically when signing up via referral link
- No credit card required during extended trial

### Attribution
- **Cookie window:** 30 days from first click
- **Last-click attribution:** If referee clicks multiple referral links, last one wins
- Referral code persists in cookie; survives page reloads

### Fraud Rules
- No self-referral (same email domain blocked)
- No coupon code stacking with referral discount
- Commissions on paid subscriptions only — no commissions on trial periods
- Commission clawback if referred customer cancels/charges back within 7 days of payment
- Max 1 referral account per person (email + payment method uniqueness check)

---

## 3. User Flow

### Referrer Flow
1. User logs in → navigates to **Account → Refer & Earn**
2. System auto-generates unique referral link: `internsmarket.com/r/ABC123XYZ`
3. User copies link or uses share buttons (Twitter/X, LinkedIn, email)
4. Dashboard shows: clicks, signups, active subscriptions, pending earnings, paid earnings

### Referee Flow
1. Clicks referral link → cookie set (30-day expiry)
2. Lands on homepage with banner: **"You've been invited — start your 7-day free trial"**
3. Signs up normally; referral code auto-applied at checkout
4. Sees confirmation: "Your 7-day trial is active. Invited by [referrer first name]."

### Commission Tracking Flow
1. Referee completes free trial → adds payment method → subscribes
2. First payment processed → commission moves from `pending` to `confirmed`
3. 7-day clawback window passes → commission becomes `payable`
4. Monthly batch: all `payable` commissions ≥$50 processed via PayPal or applied as credit
5. Referrer notified via email on each conversion and each payout

---

## 4. Technical Requirements

### Database Tables

```sql
-- Stores unique referral links per user
CREATE TABLE referral_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  code VARCHAR(12) UNIQUE NOT NULL,       -- e.g. "ABC123XYZ0"
  clicks INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks each referred relationship and commission lifecycle
CREATE TABLE referral_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_link_id UUID NOT NULL REFERENCES referral_links(id),
  referee_user_id UUID NOT NULL REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',   -- pending | confirmed | payable | paid | clawed_back
  monthly_commission DECIMAL(8,2),        -- 20% of referee's monthly total
  commission_expires_at TIMESTAMPTZ,      -- 12 months from first payment
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks individual monthly commission events
CREATE TABLE referral_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversion_id UUID NOT NULL REFERENCES referral_conversions(id),
  referrer_user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(8,2) NOT NULL,
  period_month DATE NOT NULL,             -- YYYY-MM-01
  status VARCHAR(20) DEFAULT 'pending',  -- pending | payable | paid
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Batch payout records
CREATE TABLE referral_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(8,2) NOT NULL,
  method VARCHAR(20) NOT NULL,           -- paypal | credit
  paypal_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'processing',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Endpoints

```
GET  /api/referral/link
     → { code, url, stats: { clicks, conversions, pending_earnings, total_earned } }

POST /api/referral/track-click
     Body: { code }
     → sets cookie, increments click count

POST /api/referral/apply
     Body: { code, referee_email }
     → validates code, marks referee with referrer, extends trial to 7 days

POST /api/referral/convert          (internal, called on payment success)
     Body: { referee_user_id, invoice_amount }
     → creates commission record, updates conversion status

POST /api/referral/payout-request
     Body: { method, paypal_email? }
     → initiates payout for all payable commissions ≥$50

GET  /api/referral/commissions
     → paginated list of commission events with status
```

### Cookie / UTM Tracking

```javascript
// On referral link landing
const ref = new URLSearchParams(location.search).get('ref');
if (ref) {
  document.cookie = `im_ref=${ref}; max-age=${30*24*60*60}; path=/; SameSite=Lax`;
}

// On signup form submit — read cookie and attach to request
const refCode = document.cookie.match(/im_ref=([^;]+)/)?.[1];
```

- Also support `?utm_source=referral&utm_campaign=<code>` for tracking in analytics (GA4/PostHog)
- On signup, server reads `im_ref` cookie or UTM param to attribute referral

### Dashboard Requirements (Referrer View)

- **Summary row:** Total clicks / Total conversions / Pending earnings / Total earned
- **Referral list:** Per-referee table: email (masked), status, date joined, interns subscribed, monthly commission
- **Commission history:** Monthly breakdown table with status badges
- **Payout section:** Current balance, payout threshold progress bar, payout request button
- **Share widget:** Referral URL with one-click copy + social share buttons

---

## 5. UI Mockup Description

### Referral Dashboard Page (`/account/referrals`)

```
┌─────────────────────────────────────────────────────────────────┐
│  Refer & Earn                                           [?] Help │
├────────────┬────────────┬─────────────────┬─────────────────────┤
│  87 Clicks │  12 Joined │  $42.00 Pending │  $120.00 Total Earned│
├─────────────────────────────────────────────────────────────────┤
│  Your referral link                                             │
│  [  https://internsmarket.com/r/ABC123XYZ0  ] [Copy] [Share ▾] │
│  Share: [Twitter/X]  [LinkedIn]  [Email]                        │
├─────────────────────────────────────────────────────────────────┤
│  Your Referrals                                     [Export CSV] │
│  Email         │ Status    │ Interns │ Mo. Commission │ Since   │
│  s****@g*.com  │ Active ●  │   3     │    $18.00       │ Jan '25 │
│  m****@y*.com  │ Trial     │   —     │    pending      │ Feb '25 │
├─────────────────────────────────────────────────────────────────┤
│  Payout Balance: $42.00  ████░░░░░  $50 threshold               │
│  [Request Payout via PayPal]  [Apply as Account Credit]         │
└─────────────────────────────────────────────────────────────────┘
```

### Share Widget on Main Website

- Placed in: post-login dashboard sidebar + account settings
- Not shown to non-logged-in visitors (program is customer-only)
- Optional: compact banner inside trial confirmation email

### Email Templates

**1. Invite (sent by referrer via email share)**
```
Subject: I'm saving you time — try InternsMarket free for 7 days

Hey [Name],

I use AI interns to handle [code reviews / research / QA] on my team.
You can try 7 days free (normally 3) using my link:

→ internsmarket.com/r/ABC123XYZ0

No credit card needed. Cancel anytime.
```

**2. Conversion Notification (to referrer)**
```
Subject: [First name] just subscribed — you earned $6.00/month

Great news — your referral just became a paying customer.

You'll earn $6.00/month for the next 12 months.
Current balance: $6.00 (threshold: $50 to pay out)

[View Dashboard]
```

**3. Payout Confirmation (to referrer)**
```
Subject: $XX.XX sent to your PayPal

Your referral earnings have been sent.

Amount: $XX.XX
Method: PayPal (you@email.com)
Reference: PAY-XXXXX

Thank you for spreading the word about InternsMarket.
[View Earnings History]
```

---

## 6. Metrics & KPIs

| Metric | Formula | Target |
|--------|---------|--------|
| Participation rate | Customers sharing / total customers | ≥8% |
| Referral conversion rate | Paid subscribers / referral clicks | ≥5% |
| Referred customer LTV | vs non-referred cohort | ≥20% higher |
| CAC via referral | Commissions paid / customers acquired | ≤40% of other channels |
| Program ROI | (Referred MRR − commissions) / commissions | ≥4:1 |
| Fraud rate | Flagged referrals / total referrals | <2% |

**Review cadence:**
- Weekly: fraud flags, top referrers, participation rate
- Monthly: ROI, payout volume, conversion rate trends
- Quarterly: CLV comparison, commission structure review

---

## 7. Implementation Roadmap

### Phase 1 — Basic Tracking + Unique Links (Week 1–2)
- [ ] DB schema: `referral_links`, `referral_conversions`
- [ ] Link generation endpoint + referral code logic
- [ ] Cookie-based attribution on landing
- [ ] Apply referral code at signup (extend trial to 7 days)
- [ ] Webhook from payment processor → mark conversion
- [ ] Basic `/account/referrals` page (link display only)

### Phase 2 — Dashboard + Payouts (Week 3–4)
- [ ] Commission calculation on each invoice payment
- [ ] DB schema: `referral_commissions`, `referral_payouts`
- [ ] Full referral dashboard with stats and referral list
- [ ] Payout request flow (PayPal email entry + trigger)
- [ ] Monthly payout batch job
- [ ] Admin view: all referrals, flag management

### Phase 3 — Automated Emails + Optimization (Week 5–6)
- [ ] Transactional emails: conversion notification, payout confirmation
- [ ] Program intro email triggered after first payment
- [ ] Fraud scoring: IP velocity, disposable email block, same-domain block
- [ ] A/B test: account credit vs PayPal preference
- [ ] CSV export for referrer's commission history
- [ ] Analytics: PostHog events for referral funnel

---

## 8. Example Calculation

**Scenario:** Referrer brings 5 users, each subscribing to 2 interns

```
Per referred customer:
  2 interns × $29.99 = $59.98/month
  20% commission     = $11.996/month
  Over 12 months     = $143.95

For 5 referred customers:
  Monthly commission = $11.996 × 5 = $59.98/month
  Annual earnings    = $59.98 × 12 = $719.76

Cost to InternsMarket for those 5 customers over 12 months:
  Gross revenue = $59.98 × 5 × 12 = $3,598.80
  Commissions   = $719.76 (20%)
  Net revenue   = $2,879.04

CAC per referral channel customer = $719.76 / 5 = $143.95
  (vs typical SaaS paid CAC of $200–$400)
```

**First payout:** Referrer hits $50 threshold after ~5 payments received (≈month 1 with 5 active referrals).

---

## Notes & Unresolved Questions

- **Payment processor:** Stripe recommended for webhook-driven commission tracking; design assumes Stripe invoice events
- **PayPal API:** Payouts API requires business account approval; consider Tremendous or Trolley as alternatives if approval is slow
- **Currency:** USD only at launch; multi-currency adds complexity
- **Open question:** Should referrers earn commission on add-on interns purchased by the referee mid-subscription, or only on interns present at initial conversion?
- **Open question:** Commission on annual plan payments — split monthly or paid upfront as lump sum?

---

## 9. Tiered Commission Structure

Performance-based tiers incentivize high-volume referrers.

| Tier | Requirement | Commission | Monthly Example (5 referrals × 2 interns) |
|------|-------------|------------|---------------------------------------------|
| Base | Default | 20% | $59.98/mo |
| Growth | 5+ conversions/mo | 30% | $89.97/mo |
| Elite | 15+ conversions/mo | 40% | $119.96/mo |

**Rules:**
- Tier evaluated monthly based on new paid conversions that month
- Tier applies to ALL active commissions that month (not just new ones)
- Downgrade grace: 1 month below threshold before reverting to lower tier
- "Conversion" = referee completes free trial and makes first payment

**Calculation example — Growth tier:**
```
10 active referrals × 2 interns × $29.99 = $599.80 referred MRR
30% commission = $179.94/month vs $119.96 at base rate
Uplift = +$59.98/month for hitting 5+ conversions
```

---

## 10. KOL/KOC Partnership Program

For external creators and influencers who can drive referrals at scale.

### KOL vs KOC — Which to Target

| | KOL (Key Opinion Leader) | KOC (Key Opinion Consumer) |
|-|--------------------------|----------------------------|
| Reach | 10K–1M+ followers | 1K–50K followers |
| Cost | $1,000–$50,000+/post | Free trial + small commission |
| Conversion rate | Moderate | High (authentic voice) |
| Best for InternsMarket | Brand awareness | Revenue-driving referrals |
| Priority | Month 2–3 | Month 1 |

**Recommendation:** Start with KOCs (micro-influencers in AI/productivity niche). Lower cost, higher conversion, less brand risk.

### Target Profiles

- AI tool reviewers on YouTube (5K–100K subs)
- SaaS productivity bloggers with email lists >2K
- Twitter/X accounts focused on "AI for work", "developer tools"
- LinkedIn creators in startup/ops/dev space
- Newsletter authors: dev, no-code, productivity niches

### 12-Step Vetting Checklist

**Phase 1 — Screening**
1. Audience is AI/tech/productivity adjacent (>60% match)
2. Fake follower rate <15% (use HypeAuditor or Modash)
3. Engagement rate ≥2% micro / ≥0.5% macro

**Phase 2 — Content**
4. No competing SaaS partnerships (AI intern competitors)
5. Content quality: clear, actionable, not click-bait
6. Brand safety: no controversy in last 12 months

**Phase 3 — Viability**
7. Responsive within 5 business days
8. Open to performance-based (commission) vs flat-fee only
9. FTC disclosure compliant in past sponsored posts

### Compensation Models

| Situation | Model | Terms |
|-----------|-------|-------|
| Micro-influencer (<10K) | Commission only | 25% recurring, 12 months |
| Mid-tier (10K–100K) | Hybrid | $500 base + 20% commission |
| Large KOL (100K+) | Negotiated | $1K–$3K base + 15–20% |
| Agency partner | Revenue share | 20% on all clients referred |

**Default KOC offer:** Same as referral base (20%), upgraded to Growth tier (30%) after 5 conversions.

### Discovery Tools

- **Modash** — fake follower detection, engagement analysis
- **HypeAuditor** — influencer ranking and audience quality
- **Upfluence** — 190M+ creator database, outreach management
- Manual: Search YouTube/Twitter/LinkedIn with keywords like "AI tools review", "SaaS productivity"

---

## 11. Affiliate Outreach Templates (Cold Email)

Use these to recruit affiliates/KOCs into the referral program.

### Template A — AI Tool Reviewer

```
Subject: [Name], your audience would love InternsMarket

Hi [Name],

Caught your review of [relevant AI tool]. Your audience clearly cares about AI productivity tools.

I run InternsMarket — we sell AI intern personas (code reviewer, QA tester, data analyst, etc.) at $29.99/intern/month. Basically AI teammates on demand.

Happy to offer you:
- 20% recurring commission for 12 months per referral
- Bumps to 30% once you hit 5 conversions/month
- 7-day extended trial for your audience (vs standard 3-day)
- Dashboard to track clicks, conversions, and earnings

Would love to send you free access to demo any intern.

Worth a 10-minute chat?

Best,
[Your Name]
InternsMarket | internsmarket.com
```

### Template B — Newsletter / Blog Follow-up

```
Subject: Quick follow-up — InternsMarket affiliate offer

Hi [Name],

Reached out last week about partnering on InternsMarket.

Quick recap: we pay 20–40% recurring commission on every subscriber you refer, for 12 months. At $29.99/intern/month, a single active referral earns you ~$6–$12/month passively.

One affiliate brought in 8 customers in month 1 — earning $57.59/month in recurring income.

If that's interesting, here's a 5-minute signup: [affiliate link]

Or reply and I'll send over a proper brief.

Best,
[Your Name]
```

### Template C — Final Touch

```
Subject: Last note — InternsMarket partnership

Hi [Name],

Last reach-out, I promise.

InternsMarket affiliate program:
- 20% recurring commission, 12 months
- 30-day cookie window
- Monthly PayPal payout, $50 minimum
- Dedicated support + assets provided

Join here in 2 minutes: [affiliate signup link]

Even if timing isn't right now, happy to stay in touch.

Best,
[Your Name]
```
