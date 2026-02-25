# InternsMarket — Project Overview & PDR

## Product Vision

InternsMarket sells AI intern personas as CLI-installable packages. Each intern is a complete AIEOS v1.1 entity with personality, skills, memory, and voice. Users install interns locally, activate them, and run them in their preferred runtime (ZeroClaw or OpenClaw).

**Tagline:** "Hire, train & deploy your personal AI intern in one click."

---

## Target Users

### Primary
- **Solopreneurs & small businesses** who need domain-specific AI assistance without building custom prompts
- **Developers & engineers** who want to automate code review, testing, documentation
- **Content creators & agencies** building workflows with specialized AI personas

### Secondary
- **Enterprises** managing teams of AI agents across departments
- **Educators** using interns as AI teaching assistants
- **Researchers** exploring AIEOS persona design

---

## Value Proposition

1. **Ready-to-Use AI Interns** — Pre-built personas with validated skills, no prompt engineering required
2. **Personality-First Design** — Each intern has voice, personality, and communication style baked in
3. **Flexible Runtimes** — Works with ZeroClaw (local) or OpenClaw (enterprise)
4. **CLI-First** — Lightweight, easy to automate and integrate into workflows
5. **Licensing Model** — Tier-based access (Free/Starter/Pro) via Polar.sh

---

## Feature Summary

### Core Features (v1.0)
- **CLI Tool** (`im` command) — Install, manage, activate interns
- **Core Library** — AIEOS types, validators, compilers (for custom interns)
- **1 Launch Intern** — Content Marketing (Jordan Lee) with 5 skills
- **License System** — Free tier (1 intern), Starter (5), Pro (unlimited)
- **Runtime Adapters** — ZeroClaw + OpenClaw config generation

### Released in v1.1
- **Expanded Roster** — 11 interns across multiple domains (marketing, dev, data, ops, UX, etc.)
- **ProMax Upgrade** — Code Review intern with enhanced capabilities
- **Landing Page** — Next.js 15 website with intern discovery and pricing
- **Intern Catalog** — All 11 interns showcased with tags and descriptions

### Planned (v1.2+)
- Web-based marketplace with user accounts
- Intern customization (adjust personality traits, skills)
- Community intern submissions & ratings
- Advanced analytics (usage, performance metrics)
- Webhook integrations for workflow automation

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

## Pricing Model

| Tier | Monthly | Limit | Features | Upgrade Link |
|------|---------|-------|----------|--------------|
| **Free** | $0 | 1 intern | Try it out | — |
| **Starter** | $9 | 5 interns | Small team | internsmarket.com/upgrade |
| **Pro** | $19 | Unlimited | Enterprise | internsmarket.com/upgrade |

**License Activation Flow:**
1. User runs `im activate` → pastes Polar.sh license key
2. Key validated via Polar.sh API (cached 24h)
3. Tier cached locally; grace period allows 3 days offline
4. Install gated by tier: "Pro required" → show upgrade link

---

## Current Status (v1.1)

### Completed
- Core library (types, validators, compilers)
- CLI tool with 8 commands
- 11 AI intern personas (content, code-review, data, devops, life-coach, ops, qa, research, social-media, tech-writer, ux-design)
- License system (Polar.sh integration)
- Runtime adapters (ZeroClaw + OpenClaw)
- Landing page with intern discovery
- Comprehensive documentation

### Known Limitations
- No user accounts (CLI-only, no web login)
- No intern customization UI
- No community submissions
- Single launch region (US)
- No analytics dashboard

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
