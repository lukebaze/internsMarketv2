# InternsMarket Roadmap

High-level development roadmap tracking phases, milestones, and progress toward v1.2 and beyond.

---

## Current Status (v1.1 — Feb 2026)

**Status:** COMPLETE & LIVE

- Core library finalized (AIEOS v1.1 schema)
- CLI tool shipped (8 commands)
- 11 AI interns released (content, code-review, data, devops, life-coach, ops, qa, research, social-media, tech-writer, ux-design)
- Landing page live (Next.js 15)
- License system migrated to Polar.sh (from Lemon Squeezy)
- Package signing infrastructure (Ed25519 via node:crypto)
- GitHub Releases distribution + registry client (5-min cache)
- npm publishing (3 free full + 8 paid shell packages)
- Runtime adapters complete (ZeroClaw + OpenClaw)

**Metrics:**
- ~5,600 LOC across 4 packages + scripts
- 120+ source files
- 80%+ test coverage on validators/compilers
- 22 unit tests for signing, licensing, watermarking

---

## Phase 1: Install Flow, Licensing & Package Security (v1.1 — COMPLETE)

**Timeline:** Feb 2026
**Status:** ✅ COMPLETE

**Deliverables:**
- [x] Polar.sh license integration (replace Lemon Squeezy)
- [x] Ed25519 package signing (node:crypto, zero npm deps)
- [x] GitHub Releases distribution (manifest.json + ETag cache)
- [x] Package signature verification at install
- [x] Package watermarking (activationId injection)
- [x] npm publishing (3 free full + 8 paid shell packages)
- [x] npm package resolver (shell vs. full detection)
- [x] Unit tests for all security components

**Key Features:**
- License activation via Polar.sh with tier gating
- 24h cache for paid, 1h for free, 3-day grace period
- Ed25519 signatures prevent tampering
- GitHub Releases as main distribution channel
- npm packages as secondary (with license gates)

**Recent Updates (Feb 25, 2026):**
- Security Hardening (7 improvements):
  - H1: Build-time enforcement — signing-keys.ts throws error on empty TRUSTED_PUBLIC_KEYS in production
  - H2: Download URL validation — registry-client.ts checks domain prefix before fetching
  - M1: Extracted shared intern-id-validator.ts (eliminates regex duplication)
  - M2: License fallback fixed — placeholder POLAR_ORG_ID now returns 'free' instead of stale tier
  - M3: Symlink protection — copyDirSync skips symlinks to prevent traversal attacks
  - M4: Cleanup orphaned installPath on post-rename watermark/config failure
  - M5: Extracted shared cli-version.ts (single createRequire source of truth)

---

## Phase 2: Landing Page (v1.1 — COMPLETE)

**Timeline:** Feb 2026
**Status:** ✅ COMPLETE

**Deliverables:**
- [x] Next.js 15 landing page with Tailwind CSS v4
- [x] Hero section, feature highlights, how-it-works
- [x] Intern catalog showcasing all 11 interns
- [x] Pricing table (Free/Starter/Pro)
- [x] Social proof & testimonials
- [x] Responsive design (mobile, tablet, desktop)
- [x] Design guidelines & component library
- [x] Deployed to Vercel with auto-preview

**Recent Updates (Feb 25, 2026):**
- Landing page design sync with Pencil:
  - Hero section: amber glow code block with rounded corners & border, "WATCH 90S DEMO" button
  - Hero subtitle: updated to "Think Shopify Themes for AI Agents"
  - CopyableCodeBlock component: reusable across hero, how-it-works, CTA sections
  - How It Works: code blocks now copyable on hover with copy icon
  - CTA terminal: command lines copyable with hover icons, colors match Pencil design
  - CTA subtitle: "No credit card required · Free tier available"
  - Gradient overlay updated (darker gradient from black to match design)

**Next:** Wire remaining button interactions (pricing, upgrade flow) in v1.2

---

## Phase 2: SaaS Infrastructure (v1.2 — Q2 2026) [NEW]

**Timeline:** Mar–May 2026
**Status:** 🔲 IN PROGRESS

**Objective:** Web-based cloud platform with user accounts, subscription billing, and intern discovery.

### 2a: User Authentication & Accounts (Estimated: 2 weeks)
- Email/password sign-up and login
- User profile management (name, email, tier)
- Session management (JWT or secure cookies)
- Password reset flow
- Email verification

### 2b: Dashboard & Intern Discovery (Estimated: 2 weeks)
- Cloud dashboard UI (Next.js)
- Browse, search, filter interns by category/skill
- Intern detail pages (full specs, skills, personality traits)
- One-click subscribe to intern
- View active subscriptions

### 2c: Billing & Subscription (Estimated: 2 weeks)
- Stripe/Polar.sh integration for subscriptions
- 3-day free trial flow (no credit card)
- Subscribe to $29.99/intern/mo or $79.99/3-pack
- Subscription management (upgrade/downgrade)
- Invoice generation and email
- License key generation and display

### 2d: Marketing Launch (Estimated: 3 weeks)
- Twitter presence activation
- Discord community launch
- Product Hunt campaign prep
- Blog/content marketing
- Referral program setup

---

## Phase 3: Marketplace MVP (v1.2+ — Q3 2026) [LEGACY → ENHANCED]

**Timeline:** May+ 2026
**Status:** 🔲 PLANNED

**Objective:** Advanced marketplace with user accounts, customization, and community.

### 3a: Intern Customization (Estimated: 3 weeks)

**Requirements:**
- Adjust personality traits (creativity, empathy, logic, etc.)
- Customize voice/idiolect settings
- Select subset of skills or disable skills
- Save customized variant with version suffix

**Deliverables:**
- Customization page (trait sliders, voice presets)
- Custom variant save & download
- CLI support for custom interns
- Version management (original vs. custom)

**Acceptance Criteria:**
- User can adjust 6 personality traits (0.0–1.0 scale)
- Custom intern generates unique persona prompt
- Customized intern can be installed locally
- Custom version persists in user profile

### 3b: Community Intern Submissions (Estimated: 2 weeks)

**Requirements:**
- Submit custom intern form (upload .intern bundle or manifest)
- Validation pipeline (schema check, skill validation)
- Community review system (ratings, comments)
- Publish to marketplace with creator credit

**Deliverables:**
- Intern submission page
- Validation service (reuse core library validators)
- Ratings & reviews page
- Creator dashboard
- "Community" tab on marketplace

**Acceptance Criteria:**
- User can submit .intern package
- Submission validated within 24h
- Validated intern appears in community section
- Creator can view submission stats

### 3c: Referral & Affiliate Programs (Estimated: 2 weeks)

**Requirements:**
- 20% recurring commission for referrals
- Affiliate program (25% recurring, tiered to 40%)
- Leaderboard & tracking dashboard
- Email notifications for referral signups

**Deliverables:**
- Referral link generation
- Tracking dashboard (clicks, conversions, earnings)
- Affiliate recruitment page
- Payout system (monthly payments)

**Acceptance Criteria:**
- Referrer can share link and track conversions
- Commission calculated correctly (20% of $29.99 = $6)
- Affiliate can track earnings and payouts
- Top referrers visible on leaderboard

---

## Phase 4: Analytics & Insights (v1.3+ — Q3 2026)

**Timeline:** Jun–Sep 2026
**Status:** 🔲 PLANNED

**Objective:** Provide metrics on intern usage and performance.

**Requirements:**
- Track subscriptions, cancellations, conversions
- Usage dashboard (MRR, churn, top interns)
- Performance metrics (trial→paid rate, CAC)
- Creator analytics (downloads, usage, feedback)

**Deliverables:**
- Analytics dashboard (for admins)
- Usage reports (weekly/monthly)
- Creator performance tracking
- Churn analysis and retention metrics

**Acceptance Criteria:**
- Dashboard shows total MRR and churn rate
- Top 3 interns ranked by subscriptions
- Trial→paid conversion tracked
- Creator can see how their interns are used

---

## Phase 5: Advanced Automation (v1.4+ — Q4 2026+)

**Timeline:** Q4 2026+
**Status:** 🔲 PLANNED

**Objective:** Webhook integrations and trigger-based workflows.

**Requirements:**
- Define webhooks for intern skill triggers
- Create automation rules (if X, run skill Y with params)
- Schedule recurring tasks
- Multi-intern orchestration

**Deliverables:**
- Webhook management API
- Rule builder UI (workflow designer)
- Scheduler service
- Orchestration engine

**Acceptance Criteria:**
- User can create webhook for skill invocation
- Webhook triggers skill execution with custom params
- Scheduled task runs at specified intervals
- Multiple interns can be orchestrated in sequence

---

## Phase 6: Mobile App (v1.5+ — 2027)

**Timeline:** 2027 (exploratory)
**Status:** 🔲 PLANNED

**Objective:** Native mobile app for managing and invoking interns on-the-go.

**Requirements:**
- List installed interns
- Trigger skill execution via mobile UI
- View skill results
- Manage licenses

**Deliverables:**
- iOS app (React Native or Swift)
- Android app (React Native or Kotlin)
- Mobile API endpoints
- Push notifications for completed tasks

**Acceptance Criteria:**
- User can install intern from mobile app
- User can invoke skill and view results
- App syncs with web account
- Offline mode caches data

---

## Milestone Summary

| Milestone | Phase | Timeline | Status | Key Metrics |
|-----------|-------|----------|--------|------------|
| **Launch (v1.0)** | Initial release | Q4 2025 | ✅ Complete | 1 intern, core + CLI |
| **Expanded Roster (v1.1)** | Phases 1–2 | Feb 2026 | ✅ Complete | 11 interns, licensing, signing, npm publishing |
| **SaaS Platform (v1.2)** | Phase 2 | Q2 2026 | 🔲 IN PROGRESS | Web dashboard, subscriptions, marketing launch |
| **Community & Customization (v1.3)** | Phase 3 | Q3 2026 | 🔲 Planned | Custom interns, community submissions, referrals |
| **Analytics (v1.4)** | Phase 4 | Q3–Q4 2026 | 🔲 Planned | Telemetry, metrics, insights |
| **Automation (v1.5)** | Phase 5 | Q4 2026 | 🔲 Planned | Webhooks, orchestration, scheduling |
| **Mobile (v1.6)** | Phase 6 | 2027 | 🔲 Exploratory | iOS + Android apps |

---

## Key Initiatives

### 1. SaaS Platform Launch (Highest Priority)
**Rationale:** Convert CLI adoption to recurring SaaS revenue.
**Ownership:** Product + Frontend team
**Risk:** Auth complexity, billing integration, user migration
**Mitigation:** Use Supabase (auth + DB), Stripe/Polar.sh for billing

### 2. Marketing Launch (Highest Priority — Parallel)
**Rationale:** Drive trial signups and brand awareness for SaaS pivot.
**Ownership:** Marketing + Community team
**Risk:** Low organic reach initially
**Mitigation:** Twitter activation, Product Hunt launch, referral program

### 3. Community & Customization (Medium Priority)
**Rationale:** Increase stickiness and expand catalog.
**Ownership:** Product + Community team
**Risk:** Quality control, UI complexity
**Mitigation:** Start with neural matrix slider, human review for community

### 4. Analytics (Low Priority for MVP)
**Rationale:** Understand usage patterns, optimize retention.
**Ownership:** Data + Analytics team
**Risk:** Privacy concerns
**Mitigation:** Clear opt-in, anonymous data, no PII

---

## Engineering Priorities (v1.2 SaaS)

### Must-Have (Q2 2026)
- User authentication (Next.js + Supabase)
- Web dashboard with intern discovery
- Subscription billing (Stripe/Polar.sh)
- 3-day free trial flow
- License key generation
- Bug fixes from v1.1 feedback

### Should-Have (Q2–Q3)
- Community submission system
- Customization UI (MVP: neural matrix only)
- Email notifications (signup, trial expiry, renewal)
- Referral program (20% commission)

### Nice-to-Have (Q3+)
- Full-text search (Algolia optional)
- Dark mode toggle
- Intern analytics dashboard
- API rate limiting
- Affiliate program (25–40% tiered)

---

## Success Criteria by Phase

### v1.1 (Complete — Feb 2026)
- [x] Landing page live and accessible
- [x] All 11 interns displayed with descriptions
- [x] Pricing clearly communicated
- [x] CLI tool with 8 commands
- [x] License system (Polar.sh)
- [x] Package signing & GitHub distribution

### v1.2 SaaS (Q2 2026)
- [ ] 500+ trial signups
- [ ] 50+ paid subscribers ($1.5K+ MRR)
- [ ] 10% trial→paid conversion rate
- [ ] Twitter audience 3K+
- [ ] Discord community 500+ members
- [ ] Product Hunt Top 10 launch
- [ ] Zero auth/payment-related bugs

### v1.3+ (Q3–Q4 2026)
- [ ] 2,000+ active monthly users
- [ ] $5,000+ MRR
- [ ] 50+ community-submitted interns
- [ ] 20% of users active in referral program
- [ ] NPS > 50

---

## Open Questions & Decisions Needed

1. **Database choice for SaaS** — PostgreSQL (Supabase) vs. Firestore? *(Recommend Supabase for speed + SQL)*
2. **Payment processor** — Stripe vs. Polar.sh? *(Recommend Stripe for flexibility, fallback to Polar.sh)*
3. **User onboarding** — Guided tour or self-service? *(Start self-service, add tour in v1.3 if needed)*
4. **Community moderation** — Human review vs. automated checks? *(Hybrid: automated schema check + 24h human review)*
5. **Data privacy & GDPR** — In-scope when user accounts launch; privacy policy required by Q2 end
6. **Mobile strategy** — React Native vs. native? *(Defer to 2027 after web MVP, revisit)*

---

## Dependencies & Blockers

### External
- Lemon Squeezy API stability (license validation)
- Vercel availability (landing page)
- GitHub API (intern bundle distribution)

### Internal
- Core library stability (no breaking AIEOS changes planned)
- CLI backward compatibility (important for installed user base)

---

## Contact & Ownership

**Roadmap Owner:** *TBD*
**Last Updated:** March 5, 2026 (SaaS Pivot)
**Review Frequency:** Weekly during SaaS launch (Q2), then monthly

Questions or suggestions? File an issue on GitHub or reach out to the team on Discord.
