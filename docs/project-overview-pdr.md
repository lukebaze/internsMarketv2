# InternsMarket — Project Overview & PDR

## Product Vision

InternsMarket is a SaaS platform selling AI intern personas at $29.99/intern/month with 3-day free trial. Each intern is a complete AIEOS v1.1 entity with personality, skills, memory, and voice. Users discover, subscribe, and activate interns via cloud-hosted dashboard.

**Tagline:** "AI Agents With Real Identity. Not Just Skills."

---

## Target Users (SaaS Model)

### Primary
- **Solopreneurs & founders** (25–45, tech-savvy, $50K+ income) needing AI help without prompt engineering
- **Small dev teams** wanting specialized AI agents for code review, testing, docs
- **Content creators & agencies** building AI-powered workflows with pre-built personas

### Secondary
- **Enterprises** managing teams of AI agents across departments
- **Educators** using interns as AI teaching assistants
- **Researchers** exploring AIEOS persona design

**Geographic:** Global, English-speaking markets first

---

## Value Proposition (SaaS)

1. **Ready-to-Use AI Interns** — 11 pre-built personas with validated skills, no prompt engineering required
2. **Personality-First Design** — Each intern has voice, personality, communication style (not just tool-first)
3. **Cloud-Hosted Dashboard** — Discover, subscribe, activate interns without CLI friction
4. **3-Day Free Trial** — Test any intern before paying $29.99/mo
5. **Subscription Flexibility** — $29.99/intern, $79.99/3-pack, custom team pricing 5+
6. **Skill Specialization** — Marketing, code review, QA, data analysis, DevOps, UX research, etc.

---

## Feature Summary

### Completed (v1.1 — Feb 2026)
- **CLI Tool** — Install, manage, activate interns (legacy)
- **Core Library** — AIEOS types, validators, compilers
- **11 AI Interns** — Content marketing, code review, QA, data analyst, DevOps, life coach, ops, research, social media, tech writer, UX design
- **License System** — Polar.sh integration, Free/Starter/Pro tiers
- **Landing Page** — Next.js 15, intern discovery, pricing table
- **Package Signing** — Ed25519 signatures, GitHub Releases distribution

### SaaS Platform (v1.2 — Q2 2026, IN PROGRESS)
- **Cloud Dashboard** — User accounts, intern management, subscription tracking
- **Web-Based Discovery** — Browse, filter, subscribe to interns
- **3-Day Free Trial** — No credit card required
- **Subscription Management** — Upgrade/downgrade, license keys
- **Payment Integration** — Stripe/Polar.sh for billing

### Planned (v1.3+)
- Intern customization (adjust personality traits, skills)
- Community intern submissions & ratings
- Advanced analytics (usage, performance metrics)
- Referral program (20% recurring commission)
- Affiliate program (25% recurring, tiered to 40%)

---

## Architecture Highlights

### Technology Stack
- **Language**: TypeScript with strict mode (ESM-only)
- **CLI**: Commander + Ink (React-based TUI)
- **Core**: Zod validators, AIEOS schema, compilers
- **Website**: Next.js 15 + Tailwind CSS v4
- **License**: Polar.sh payment + license validation
- **Testing**: Vitest

### Monorepo Structure
```
packages/
├── core/        # 1,878 LOC — AIEOS types, validators, compilers
├── cli/         # 1,761 LOC — CLI app (Commander + Ink)
├── website/     # 1,403 LOC — Next.js landing page
└── interns/     # (11 packages) — AI intern bundles
```

### Key Design Decisions
1. **ESM-only** — Modern, tree-shakeable, native Node.js 20+
2. **200-line file limit** — Enforces modular code organization
3. **AIEOS v1.1 schema** — 9 layers (identity, psychology, linguistics, etc.)
4. **Static intern data** — No database yet; data in JSON + TypeScript
5. **No build framework for interns** — Just `.tar.gz` bundles with manifest + aieos

---

## Pricing Model (SaaS)

| Plan | Price | Trial | Includes | Best For |
|------|-------|-------|----------|----------|
| **Free** | $0 | — | 1 free intern test | Evaluation |
| **Single** | $29.99/mo | 3 days | 1 intern subscription | Solo users |
| **3-Pack** | $79.99/mo | 3 days | 3 interns | Small teams |
| **Team** | Custom | Case-by-case | 5+ interns | Enterprises |

**Activation Flow (SaaS):**
1. User signs up at internsmarket.com
2. Discovers interns in web dashboard
3. Starts 3-day free trial (no credit card)
4. Subscribes to $29.99/intern/mo via Stripe
5. Activates interns in dashboard and via CLI
6. Billing via credit card (auto-renew)

---

## Current Status (v1.1 → v1.2 SaaS Pivot)

### Completed (v1.1)
- Core library (types, validators, compilers)
- CLI tool with 8 commands
- 11 AI intern personas
- License system (Polar.sh integration)
- Runtime adapters (ZeroClaw + OpenClaw)
- Landing page with intern discovery
- Package signing & GitHub distribution

### In Progress (v1.2 SaaS Platform)
- User authentication & accounts
- Cloud dashboard for intern discovery
- Subscription & billing integration
- Web-based license management
- 3-day free trial flow

### Known Limitations
- No intern customization UI yet
- No community submissions yet
- No analytics dashboard yet
- Limited to web-first, CLI as secondary

---

## Marketing Objectives (SaaS Launch)

| Goal | Target | Timeline |
|------|--------|----------|
| **Brand Awareness** | 10K Twitter impressions/week | Q1–Q2 2026 |
| **Trial Signups** | 500 free trial users | Q2 2026 |
| **Paid Conversion** | 50 paid subscribers | Q2 2026 |
| **MRR** | $1,500+ | Q2 2026 end |
| **CAC** | <$20 per converted user | Ongoing |
| **Referral Rate** | 10% of users active | Q2 2026 |
| **Community** | Discord 500+ members | Q2 2026 |

**Competitive Landscape:** vs Relevance AI, CrewAI, Lindy.ai, Taskade AI — Differentiator: **Personality-first** (not workflow-first)

---

## Success Metrics

### Adoption
- **CLI downloads**: 1,000+ installs in first 30 days
- **Active users**: 200+ monthly active users by Q2 2026
- **Tier conversion**: 30% of free users upgrade to Starter

### Engagement
- **Intern usage**: >50% of installed interns used >2x/week
- **Marketplace growth**: 5 new community interns by end of Q2
- **NPS**: Target 50+ (early community feedback)

### Business
- **MRR**: $1,000+ by end of Q2 2026
- **CAC**: <$20 per converted user
- **Churn**: <5% monthly for paid tiers

---

## Dependencies & Integrations

### External Services
- **Polar.sh** — Payment processing + license management
- **GitHub** — Code repository, releases for intern bundles
- **Vercel** — Landing page hosting
- **ZeroClaw / OpenClaw** — Runtime platforms (customer installs)

### Technical Dependencies
- Node.js 20+ runtime
- npm workspaces
- TypeScript 5.7+
- Vitest for testing

---

## Risk Assessment

### High Risk
- **Runtime incompatibility** — ZeroClaw/OpenClaw breaking changes
  - *Mitigation*: Version pinning, integration tests, customer communication

### Medium Risk
- **License validation failures** — Polar.sh API downtime
  - *Mitigation*: Grace period (3 days), local caching, fallback to free tier
- **Intern discovery** — Low adoption if interns aren't discoverable enough
  - *Mitigation*: Showcase on landing page, SEO, community marketing

### Low Risk
- **Build complexity** — npm workspaces complexity
  - *Mitigation*: Clear documentation, pre-commit linting

---

## Security & Compliance

### Data Protection
- No user data stored server-side (CLI-only for now)
- License keys stored locally via XDG-compliant `conf` package
- No telemetry by default

### API Security
- Polar.sh API calls via HTTPS only
- License key validation with rate limiting (on roadmap)
- No credentials in code or git

### Future Considerations
- User accounts require authentication (OAuth, email verification)
- GDPR compliance if handling user data
- Intern skill validation (prevent malicious skills)

---

## Roadmap (High-Level)

### Q1 2026 (Current)
- [x] v1.0 core + CLI shipped
- [x] v1.1 intern roster (11 interns)
- [x] Landing page live
- [ ] Fix: Landing page button wiring (in progress)

### Q2 2026
- [ ] v1.2 marketplace MVP (web UI + user accounts)
- [ ] Community intern submissions
- [ ] Usage analytics dashboard
- [ ] Customize intern personality (beta)

### Q3 2026+
- [ ] Mobile app exploration
- [ ] Advanced automation (webhooks, triggers)
- [ ] Team management (invites, permissions)
- [ ] Enterprise support tier

---

## Team & Responsibilities

**TBD** — To be assigned as team grows.

---

## Glossary

| Term | Definition |
|------|-----------|
| **AIEOS** | AI Entity Operating System — 9-layer persona schema (identity, psychology, linguistics, etc.) |
| **.intern** | Package format: directory with manifest.json, aieos.json, skills/, memory-seeds/ |
| **Tier** | License level: Free (1), Starter (5), Pro (unlimited) interns |
| **Intern** | AI persona sold as a package; can be installed locally and run in a runtime |
| **Runtime** | Execution environment (ZeroClaw or OpenClaw) that runs interns |
| **Skill** | Specific capability of an intern (e.g., "blog-post-writer", "code-reviewer") |
