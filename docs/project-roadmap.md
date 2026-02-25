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

## Phase 3: Marketplace MVP (v1.2 — Q2 2026)

**Timeline:** Mar–May 2026
**Status:** 🔲 NOT STARTED

**Objective:** Web-based marketplace with user accounts, intern discovery, and license management.

### 3a: User Authentication (Estimated: 3 weeks)

**Requirements:**
- Email-based sign-up and login
- OAuth integration (Google, GitHub optional)
- User profile management (name, email, tier)
- Session management via JWT or session cookies

**Deliverables:**
- Authentication service (Next.js API routes + database)
- Sign-up page, login page, account settings
- Password reset flow
- Email verification

**Acceptance Criteria:**
- New user can sign up and receive verification email
- Existing user can log in and view account
- Tier information persists across sessions
- Failed login attempts handled gracefully

### 3b: Marketplace Web UI (Estimated: 4 weeks)

**Requirements:**
- Browse all interns by category or tag
- View intern details (skills, personality traits, use cases)
- One-click install via web UI (triggers CLI or direct download)
- Search and filter (category, skill, tier required)
- User dashboard (installed interns, licenses)

**Deliverables:**
- Marketplace page layout (grid/list view)
- Intern detail page with full specs
- Install button (web → CLI integration)
- User dashboard component
- Search/filter service

**Acceptance Criteria:**
- User can find intern by keyword
- User can view all interns sorted by category
- Install button shows tier requirement if needed
- Dashboard shows all installed interns + versions

### 3c: License Integration (Estimated: 2 weeks)

**Requirements:**
- Link Lemon Squeezy account to web dashboard
- Show active licenses + subscription status
- Upgrade/downgrade UI
- License key generation and display

**Deliverables:**
- Lemon Squeezy API wrapper (purchase, list licenses, check tier)
- License management page
- Upgrade flow (with checkout redirect)
- License display in user dashboard

**Acceptance Criteria:**
- User can view active licenses on dashboard
- User can initiate upgrade to Starter/Pro
- License key syncs with CLI (CLI recognizes web-activated key)
- Free tier limit enforced

---

## Phase 4: Community Interns (v1.2+ — Q2/Q3 2026)

**Timeline:** Apr–Jun 2026
**Status:** 🔲 NOT STARTED

**Objective:** Allow community to submit and share custom interns.

**Requirements:**
- Submit intern form (upload .intern bundle or manifest)
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
- Creator can view submission stats (downloads, ratings)

---

## Phase 5: Customization UI (v1.2+ — Q3 2026)

**Timeline:** May–Jul 2026
**Status:** 🔲 NOT STARTED

**Objective:** Allow users to adjust intern personality traits and skills.

**Requirements:**
- Edit neural matrix traits (creativity, empathy, logic, etc.)
- Customize voice/idiolect settings
- Select subset of skills or disable skills
- Save customized variant with version suffix

**Deliverables:**
- Customization page (trait sliders, voice presets)
- Save custom intern as new version
- Download customized .intern bundle
- CLI support for custom interns

**Acceptance Criteria:**
- User can adjust 6 personality traits (0.0–1.0 scale)
- Custom intern generates unique persona prompt
- Customized intern can be installed locally
- Custom version persists in user profile

---

## Phase 6: Analytics & Insights (v1.2+ — Q3/Q4 2026)

**Timeline:** Jun–Sep 2026
**Status:** 🔲 NOT STARTED

**Objective:** Provide metrics on intern usage and performance.

**Requirements:**
- Track installations per intern (anonymized)
- Track active usage (CLI telemetry opt-in)
- Usage dashboard (downloads, active users, top interns)
- Performance metrics (compile time, skill execution time)

**Deliverables:**
- Telemetry service (CLI opt-in, data sent securely)
- Analytics dashboard (for creators and admins)
- Usage reports (weekly/monthly)
- Performance monitoring

**Acceptance Criteria:**
- Dashboard shows total downloads per intern
- Top 3 interns ranked by usage
- Performance metrics collected for top skills
- User can opt out of telemetry

---

## Phase 7: Advanced Automation (v1.3+ — Q4 2026+)

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

## Phase 8: Mobile App (v1.4+ — 2027)

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
| **Marketplace (v1.2)** | Phases 3–4 | Q2 2026 | 🔲 In Planning | Web UI, community, customization |
| **Analytics (v1.3)** | Phases 5–6 | Q3 2026 | 🔲 Planned | Telemetry, metrics, insights |
| **Automation (v1.4)** | Phase 7 | Q4 2026 | 🔲 Planned | Webhooks, orchestration, scheduling |
| **Mobile (v1.5)** | Phase 8 | 2027 | 🔲 Exploratory | iOS + Android apps |

---

## Key Initiatives

### 1. Marketplace (Highest Priority)
**Rationale:** Unlock web-based user growth and license upsell.
**Ownership:** Product + Web team
**Risk:** Authentication complexity, payment integration
**Mitigation:** Use Supabase (auth + DB) to accelerate

### 2. Community Interns (Medium Priority)
**Rationale:** Expand intern catalog without building more ourselves.
**Ownership:** Community + Moderation team
**Risk:** Quality control, marketplace spam
**Mitigation:** Initial human review, ratings system, report feature

### 3. Customization (Medium Priority)
**Rationale:** Increase stickiness and allow power users to tailor interns.
**Ownership:** Product + Frontend team
**Risk:** UI complexity, personality compilation bugs
**Mitigation:** Start with neural matrix slider, expand later

### 4. Analytics (Low Priority for MVP)
**Rationale:** Understand usage patterns for future product decisions.
**Ownership:** Data + Analytics team
**Risk:** Privacy concerns, telemetry opt-out required
**Mitigation:** Clear opt-in, anonymous data, no PII

---

## Engineering Priorities

### Must-Have (v1.2)
- User authentication
- Web marketplace UI
- License tier enforcement on web
- Bug fixes from v1.1 feedback

### Should-Have (v1.2)
- Community submission system
- Customization UI (MVP: neural matrix only)
- Email notifications

### Nice-to-Have (v1.2+)
- Full-text search with Algolia
- Dark mode
- Intern analytics dashboard
- API rate limiting

---

## Success Criteria by Phase

### v1.1 (Current — Feb 2026)
- [x] Landing page live and accessible
- [x] All 11 interns displayed with descriptions
- [x] Pricing clearly communicated
- [x] Button wiring to CLI commands (in progress)
- [ ] 100 beta sign-ups via landing page

### v1.2 (Q2 2026)
- [ ] 500+ registered users on web platform
- [ ] 50% of free users upgrade to Starter
- [ ] Marketplace shows 5+ community interns
- [ ] NPS > 40 from user feedback
- [ ] Zero auth/payment-related bugs in production

### v1.3+ (Q3 2026+)
- [ ] 2,000+ active monthly users
- [ ] $5,000+ MRR
- [ ] 50+ community-submitted interns
- [ ] Telemetry shows >60% daily active users

---

## Open Questions & Decisions Needed

1. **Database choice for marketplace** — PostgreSQL (Supabase) vs. other? *(Recommend Supabase for speed)*
2. **Payment flow** — Keep Lemon Squeezy or migrate to Stripe? *(Stay with Lemon Squeezy for MVP)*
3. **Community moderation** — Human review vs. automated checks? *(Hybrid: automated schema check + 24h human review)*
4. **Mobile strategy** — React Native vs. native per-platform? *(Defer to 2027, revisit after web MVP)*
5. **Data privacy** — GDPR compliance scope? *(In-scope when user accounts launch; privacy policy required)*

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
**Last Updated:** Feb 25, 2026
**Review Frequency:** Monthly (first Friday of each month)

Questions or suggestions? File an issue on GitHub or reach out to the team on Discord.
