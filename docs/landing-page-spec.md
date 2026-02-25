# InternsMarket Landing Page Specification

**Version**: 1.0
**Last Updated**: 2026-02-25
**Status**: Specification Document

---

## Executive Summary

This document specifies the InternsMarket landing page (internsmarket.com) — a conversion-focused page selling AIEOS v1.1 AI intern personas as CLI-installable packages. The page targets individual developers, small teams, and technical founders who need autonomous AI agents for content, ops, code, and analytics work.

**Primary Goal**: Drive installation of the `im` CLI and free tier activation.
**Secondary Goal**: Drive $9/mo Starter tier upgrades for users who need multiple interns.
**Tertiary Goal**: Seed the Pro tier ($19/mo unlimited) visibility for future enterprise interest.

---

## 1. Page Structure & Sections

### 1.1 Navigation Bar (Sticky)
**Purpose**: Always-present orientation + primary CTA visibility.

**Elements**:
- Logo/brand mark (left)
- Nav links: [Docs](#), [Pricing](#), [Gallery](#), [Discord](#)
- Secondary CTA: "Upgrade" (dropdown: pricing page link + button)
- Dark/light mode toggle (default: dark)

**Design Notes**:
- Fixed, transparent at top with backdrop blur
- Minimal spacing; no sidebar on mobile
- Dark background (#0a0a0a) with white text

---

### 1.2 Hero Section
**Purpose**: Immediate value prop + primary CTA.

**Headline Options** (choose one):
1. **"Hire, train & deploy your personal AI intern in one click"** ← Tagline focus
2. **"Meet your new AI team member. Install her in 60 seconds."** ← Speed + personality
3. **"Ship faster with autonomous AI agents. No prompting. No training."** ← Results-focused

**Subheadline** (supporting copy):
- Option A: "InternsMarket ships full-stack AI personas — personality, skills, memory, voice. Think Shopify Themes for AI Agents."
- Option B: "Get instant access to specialized AI interns: content creators, ops handlers, code reviewers, data analysts. Install one. Deploy your entire team."
- Option C: "No ChatGPT prompting loops. No fine-tuning. Just `npm install` and your AI intern is live in your ZeroClaw runtime."

**Visual Assets**:
- Animated CLI demo (showing `im install`, `im apply`, intern startup)
- OR: Hero card showcasing 3-4 interns (Jordan, Mia, Tomoko, Marcus) with personality badges
- OR: Split screen: left = terminal demo, right = installed intern running

**Primary CTA**:
- Button text: "Install Free" or "Get Started Free"
- Action: `/install` or external link to npm package
- Secondary CTA: "Watch 90s Demo" (links to CLI walkthrough video)

**Social Proof** (optional, if available):
- GitHub stars count (e.g., "⭐ 500+ stars on GitHub")
- Testimonial snippet (1-2 sentences from early user)

**Design Notes**:
- Dark background (#0a0a0a–#111111) with accent color (electric blue #0080FF or purple #7C3AED)
- Large bold headline (48–64px)
- Video or GIF showing real CLI in action — authenticity matters for devs
- Subheadline in medium weight, slightly desaturated text

---

### 1.3 How It Works
**Purpose**: Lower adoption friction by showing 3-step simplicity.

**Section Title Options**:
1. "Install. Configure. Deploy."
2. "Three commands. Your AI team is live."
3. "From zero to autonomous in 60 seconds."

**Steps** (with visuals):

| Step | Headline | Copy | Visual |
|------|----------|------|--------|
| 1 | **Install the CLI** | `npm install -g internsmarket` → Downloads the package manager. One command, done. | Code block showing command + checkmark |
| 2 | **Choose Your Interns** | `im install content-marketing-intern` → Browse the 11-person catalog. Free tier includes Jordan Lee. Upgrade to unlock 7 more. | Grid of intern avatars + tier badges |
| 3 | **Deploy & Run** | `im apply content-marketing-intern` → Generates runtime config for ZeroClaw/OpenClaw. Intern runs autonomously. Monitor via CLI. | Terminal output showing `[content-marketing] online` + status |

**Design Notes**:
- Three-column layout on desktop; stacked on mobile
- Each step gets an icon/visual (arrow, person, rocket, etc.)
- Code blocks use monospace font, dark background, syntax highlighting
- Progress indicator optional (Step 1 of 3)

---

### 1.4 Intern Catalog / Gallery
**Purpose**: Showcase the 11 interns. Differentiate by personality + tier.

**Catalog Header**:
- Headline: "Meet Your AI Team" or "The Intern Roster"
- Subheadline: "11 specialized personas. 55 skills. Pick your team."

**Intern Card Design** (for each of the 11):

```
┌─────────────────────────────┐
│  [Intern Avatar/Name]       │
│  Role: [Title]              │
│  Tier: Free | Starter | Pro │
│  Skills: [5 skill badges]   │
│  "Brief personality note"   │
│  [Learn More] → Intern page │
└─────────────────────────────┘
```

**Card Fields**:
- Avatar/visual (unique illustration for each)
- Name (e.g., "Jordan Lee")
- Role (e.g., "Content Marketing Intern")
- Tier badge (color-coded: green=Free, blue=Starter, gold=Pro)
- Top 3–5 skills (e.g., "Blog Writing", "SEO Strategy", "Brand Voice")
- Personality snippet (e.g., "Obsessed with authenticity and clarity. Writes like a human.")
- CTA link: "View Skills" or "Install Now"

**Filtering / Navigation**:
- Filter buttons: "All", "Free", "Starter", "Pro", "By Role"
- OR: Tabs by category (Content, Dev, Ops, Analytics, Design)
- Default view: All 11 interns in grid

**The 11 Interns** (in tier order):

**Free Tier (3)**:
1. Jordan Lee — Content Marketing Intern — 5 skills
2. Mia Santos — Social Media Intern — 5 skills
3. Tomoko Nakamura — Technical Writer Intern — 5 skills

**Starter Tier (7)**:
4. Alex Rivera — QA & Testing Intern — 6 skills
5. Ethan Hale — Code Review / promax — 7 skills
6. Luna Sage — Life OS Coach — 6 skills
7. Marcus Chen — DevOps & Infrastructure — 8 skills
8. Nadia Okafor — Research Intern — 6 skills
9. Priya Sharma — Data Analyst Intern — 7 skills
10. Sam Patel — Ops/Meetings Intern — 6 skills

**Pro Tier (1)**:
11. Sofia Reyes — UX Research & Design Intern — 9 skills

**Design Notes**:
- 4-column grid on desktop (960px+), 2 on tablet, 1 on mobile
- Hover effect: slight lift + skill reveal animation
- Tier color coding: green (#10b981) for Free, blue (#0080FF) for Starter, gold (#f59e0b) for Pro
- Responsive card height — or force equal height for consistency

---

### 1.5 Feature Highlights
**Purpose**: Communicate key differentiators vs. ChatGPT / other AI tools.

**Section Title**: "Why InternsMarket?" or "Built for Builders"

**Feature Grid** (3–5 key features):

| Feature | Headline | Copy |
|---------|----------|------|
| **Full Personality** | No more prompt loops | Each intern has neural matrix traits (creativity, empathy, logic, etc.), idiolect, memory. They *are* their persona — not a LLM waiting for instructions. |
| **Multi-Runtime** | Works everywhere | Deploy to ZeroClaw or OpenClaw. Same intern config, different backend. No vendor lock-in. |
| **CLI-Native** | Built for developers | `npm install`. No UI dashboards. No learning curve. Use it like any CLI tool — in scripts, hooks, workflows. |
| **Independent Agents** | Run in parallel** | Install 5+ interns. Each runs autonomously in their own process. Combine them for team-scale automation. |
| **Modular Skills** | 55+ specialized abilities | Content marketing, code review, ops triage, data analysis, design feedback. Each intern is pre-trained on their domain. |

**Design Notes**:
- Icon + headline + 2-line description
- Left-aligned text with icon on left or top
- Alternating layout optional (icon left, then right, then left)
- Use accent color for icons (#0080FF or #7C3AED)

---

### 1.6 Social Proof / Trust
**Purpose**: Build credibility for early-stage product.

**Elements** (choose 2–3):

1. **GitHub Stars**: "500+ developers have starred InternsMarket"
   - Link to GitHub repo

2. **Early User Testimonial** (if available):
   - Quote: "I replaced my freelance content writer with Jordan. Ship time dropped 60%. Cost: $0."
   - Attribution: Name + Role (e.g., "Alex Chen, Solo Founder")

3. **Community Links**:
   - Discord member count: "Join 1.2K developers on Discord"
   - X/Twitter follower count: "Follow @internsmarket"

4. **Security/Privacy** (trust signals):
   - "No external API calls. Runs locally on your machine."
   - "Proprietary runtime. Your data, your control."

**Design Notes**:
- Keep this section compact (150–200px tall max)
- Testimonial quote in italic, larger font
- Stats in bold numbers with context

---

### 1.7 Pricing Section
**Purpose**: Show tiers clearly. Drive Free → Starter conversion.

**Section Title**: "Simple, transparent pricing" or "Pick your plan"

**Pricing Table** (3-tier design):

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   Free          │   Starter       │   Pro           │   Enterprise    │
│   $0/month      │   $9/month      │   $19/month     │   Custom        │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ ✓ 1 intern      │ ✓ 5 interns     │ ✓ Unlimited     │ ✓ Unlimited     │
│ ✓ 11 interns*   │ ✓ All 11 interns│ ✓ All interns   │ ✓ Priority      │
│                 │ ✓ Email support │ ✓ Email support │ ✓ Dedicated SLA │
│ [Install]       │ [Upgrade]       │ [Upgrade]       │ [Contact Us]    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

**Feature Comparison** (detailed table below pricing cards):

| Feature | Free | Starter | Pro | Enterprise |
|---------|------|---------|-----|------------|
| Concurrent interns | 1 | 5 | Unlimited | Unlimited |
| Free tier interns (Jordan, Mia, Tomoko) | ✓ | ✓ | ✓ | ✓ |
| Starter tier interns (7 additional) | ✗ | ✓ | ✓ | ✓ |
| Pro tier intern (Sofia) | ✗ | ✗ | ✓ | ✓ |
| Multi-runtime support (ZeroClaw, OpenClaw) | ✓ | ✓ | ✓ | ✓ |
| CLI management | ✓ | ✓ | ✓ | ✓ |
| Email support | ✓ | ✓ | ✓ | ✓ |
| Community Discord | ✓ | ✓ | ✓ | ✓ |
| Custom runtime integration | ✗ | ✗ | ✓ | ✓ |
| SLA / priority support | ✗ | ✗ | ✗ | ✓ |

**CTA Buttons**:
- Free: "Install Now" (primary blue) → npm install link
- Starter: "Upgrade" (contrasting color) → Lemon Squeezy checkout
- Pro: "Upgrade" (same) → Lemon Squeezy checkout
- Enterprise: "Contact Us" (secondary) → Calendly or email form

**Design Notes**:
- Most popular plan (Starter) gets visual highlight (background color, border, "Most Popular" badge)
- Pricing table should fit above the fold on desktop (< 600px tall)
- Toggle for annual vs. monthly pricing (recommended: show annual 20% discount)
- Sticky header on pricing table for easy comparison while scrolling
- Mobile: collapse feature comparison to accordion or separate tabs

---

### 1.8 FAQ Section
**Purpose**: Address conversion blockers + reduce support load.

**Section Title**: "Frequently Asked Questions"

**8–10 Questions** (accordion-style, expandable):

1. **"What exactly is an AI Intern?"**
   - Answer: "An AI Intern is a complete AIEOS v1.1 entity — a persona with personality, voice, specialized skills, and memory. Unlike ChatGPT, each intern has their own traits, idiolect, and domain expertise. Think of them as autonomous team members, not a chat interface."

2. **"Why should I use InternsMarket instead of ChatGPT/Claude directly?"**
   - Answer: "No prompt loops. No fine-tuning. Our interns are pre-trained on their domain (marketing, dev ops, code review, etc.) and can run autonomously. ChatGPT is reactive; interns are proactive. Plus, you can run multiple interns in parallel — combine them for team-scale automation."

3. **"Can I run multiple interns at the same time?"**
   - Answer: "Yes. Free tier allows 1. Starter allows 5. Pro allows unlimited. Each runs independently in its own process, so they won't interfere with each other. Combine interns for super-powered workflows."

4. **"Which runtime does InternsMarket use?"**
   - Answer: "We support ZeroClaw and OpenClaw. Both are open-source runtimes for running AIEOS entities. You choose which one to deploy with `im apply <intern-id>`. No vendor lock-in."

5. **"Is my data private? Does InternsMarket call external APIs?"**
   - Answer: "Yes, it's private. Interns run on your machine (or your deployment). InternsMarket itself doesn't make external API calls. That said, if your intern calls an external service (like Stripe, Notion, etc.), that's your choice — we support integration but don't force it."

6. **"How much does it cost to run an intern?"**
   - Answer: "Pricing is per-month per-account, not per-intern. Free tier = $0 for 1 intern. Starter = $9/mo for up to 5. Pro = $19/mo for unlimited. Runtimes (ZeroClaw/OpenClaw) may have their own costs depending on your deployment."

7. **"Can I create my own custom intern?"**
   - Answer: "Yes. Check out the Intern Authoring Guide in our docs. You'll create a `.intern` bundle with manifest, AIEOS config, skills, and memory. Then publish to the registry or keep it private."

8. **"Do you offer refunds?"**
   - Answer: "We have a 14-day money-back guarantee for annual plans. For monthly, cancel anytime. No setup fees, no long-term contracts."

9. **"How is InternsMarket different from other AI agent platforms?"**
   - Answer: "We're CLI-first, not UI-first. We ship full personalities, not prompt templates. We support multiple runtimes. And we optimize for developers who want automation, not chatting."

10. **"Is there an enterprise tier?"**
    - Answer: "Yes. Contact us at enterprise@internsmarket.com for custom pricing, SLA, and priority support."

**Design Notes**:
- Accordion widget (click to expand, auto-collapse others)
- Max 10 questions to avoid overwhelming
- Limit answers to 2–3 sentences each
- Search/filter optional for longer FAQs

---

### 1.9 CTAs / Conversion Bottleneck
**Purpose**: Drive Free → Starter upgrade and first install.

**CTA Strategy** (multiple touchpoints):

| Location | Text | Action | Color |
|----------|------|--------|-------|
| Hero button | "Install Free" | npm install / docs | Primary Blue (#0080FF) |
| Intern cards | "Install" (Free tier) | npm install | Primary Blue |
| Intern cards | "Upgrade to Unlock" (Starter/Pro) | /pricing | Secondary (grey) |
| Pricing Starter | "Upgrade" | Lemon Squeezy checkout | Primary Blue (highlight) |
| Footer | "Get Started" | npm install | Primary Blue |

**Form Strategy**:
- NO email capture on landing page (friction too high)
- `im setup` command handles account registration post-install
- Lemon Squeezy handles payment info collection (PCI-compliant)

**Design Notes**:
- Primary CTA (Install Free) appears 3+ times on page
- Hover states: slightly lighter shade, subtle animation
- Mobile: full-width button on small screens
- Ripple or pulse animation on CTA buttons optional (add energy)

---

### 1.10 Footer
**Purpose**: Navigation + legal + community links.

**Columns**:

| Product | Company | Community | Legal |
|---------|---------|-----------|--------|
| [Docs](https://docs.internsmarket.com) | [About](https://internsmarket.com/about) | [Discord](https://discord.gg/internsmarket) | [Privacy Policy](https://internsmarket.com/privacy) |
| [GitHub](https://github.com/internsmarket/cli) | [Blog](https://internsmarket.com/blog) | [Twitter/X](https://x.com/internsmarket) | [Terms of Service](https://internsmarket.com/tos) |
| [Intern Authoring](https://docs.internsmarket.com/authoring) | [Careers](https://internsmarket.com/careers) | [Roadmap](https://github.com/internsmarket/cli/projects) | [Licenses](https://internsmarket.com/licenses) |
| | | | [Contact](https://internsmarket.com/contact) |

**Newsletter** (optional, low-friction):
- "Get updates on new interns" → email input field
- Subscribes via Mailchimp / Substack

**Social Links**:
- GitHub, Twitter/X, Discord, LinkedIn (icon links only)

**Design Notes**:
- Dark background matching header (#0a0a0a)
- Lighter text (grey #999 or white #fff)
- 4-column grid on desktop, 2x2 on tablet, single column on mobile
- Copyright notice bottom-center

---

## 2. Copy Guidelines

### 2.1 Tone of Voice
- **Primary**: Direct, developer-focused, no corporate jargon
- **Energy**: Confident but humble (we're early-stage, not overhyped)
- **Specificity**: Technical details over vagueness (e.g., "AIEOS v1.1 entity" not "powered by AI")
- **Personality**: Lean into the intern concept (team member, not tool)

### 2.2 Messaging Pillars

1. **Speed**: "One command. Live in 60 seconds."
2. **Autonomy**: "No prompting. No fine-tuning. Just run."
3. **Personality**: "Real agents with traits, voice, memory — not a chat interface."
4. **Composability**: "Install multiple interns. Build your team."
5. **Control**: "Runs on your machine. Your data. Your rules."

### 2.3 Words to Use
- Intern, persona, agent, autonomous, deploy, install, CLI, runtime, skills, personality, traits, idiolect, AIEOS, domain, specialized
- Action verbs: ship, deploy, launch, run, install, apply, configure

### 2.4 Words to Avoid
- "AI-powered" (overused; say what it does instead)
- "Magic" (vague; show the mechanism)
- "Advanced" (unclear; be specific)
- "Cutting-edge" (hype; focus on benefits)
- "Freemium" (use "Free tier" instead)
- "Prompt engineering" (implies friction we're eliminating)

### 2.5 Headline Formulas

**Speed-focused**: "[Number] + [Time] + [Outcome]"
→ "Ship 2x faster with autonomous AI interns"

**Personality-focused**: "[Who] + [What] + [Why]"
→ "Meet Jordan — your autonomous marketing intern. Install her in 60 seconds."

**Problem-first**: "[Problem] → [Solution]"
→ "Tired of ChatGPT prompt loops? Deploy a full AI team instead."

**Outcome-first**: "[Outcome] + [Via]"
→ "Build faster with a personal AI team. Just npm install."

---

## 3. Visual & Design Guidelines

### 3.1 Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Electric Blue | #0080FF | CTAs, accent elements, highlights |
| Secondary | Purple | #7C3AED | Alternative accent, hover states |
| Background | Charcoal | #0a0a0a | Main bg (dark mode default) |
| Neutral Dark | Dark Grey | #1a1a1a | Card/section backgrounds |
| Neutral Medium | Mid Grey | #4a4a4a | Borders, dividers, disabled states |
| Neutral Light | Light Grey | #d1d5db | Secondary text, labels |
| Text Primary | White | #ffffff | Headlines, body copy |
| Text Secondary | Grey | #9ca3af | Subheadlines, meta information |
| Success | Green | #10b981 | Free tier badge |
| Warning | Gold | #f59e0b | Pro tier badge, alerts |
| Accent 2 | Cyan | #06b6d4 | Links, accents (optional) |

**Dark Mode Default**: All backgrounds dark (#0a0a0a–#1a1a1a). Light text (white, greys).
**Light Mode Optional**: Invert palette for accessibility. Recommend: white bg, dark text, same accent colors.

### 3.2 Typography

| Role | Font Family | Size | Weight | Line Height |
|------|-------------|------|--------|-------------|
| H1 (Hero) | Display/Serif or Bold Sans | 48–64px | 700–900 | 1.2 |
| H2 (Section) | Bold Sans | 36–48px | 700 | 1.3 |
| H3 (Subsection) | Semi-bold Sans | 24–32px | 600 | 1.4 |
| Body | Regular Sans | 16–18px | 400 | 1.6 |
| Small | Regular Sans | 14px | 400 | 1.5 |
| Code/Mono | Monospace | 13–14px | 400 | 1.5 |

**Font Stack Recommendation**:
- Headlines: Geist, Inter, Helvetica Neue, sans-serif (modern, geometric)
- Body: Inter, system-ui, sans-serif (readable, neutral)
- Code: JetBrains Mono, Fira Code, Courier New, monospace

**Hierarchy**: Headlines in bold/600+ weight. Body in 400. Code in monospace 13–14px.

### 3.3 Layout & Responsive Design

**Desktop** (960px+):
- Hero: full-width, centered content, max 1200px
- Sections: max 1200px, generous padding (40–60px horizontal, 80–120px vertical)
- Intern grid: 4 columns
- Pricing table: 3-tier layout side-by-side
- Footer: 4-column grid

**Tablet** (640px–960px):
- Hero: adjusted font sizes (36–48px H1), narrower content
- Sections: max 90% width, padding 30–40px
- Intern grid: 2 columns
- Pricing table: stacked or scrollable
- Footer: 2-column grid

**Mobile** (< 640px):
- Hero: H1 24–32px, full-width
- Sections: full-width, padding 20–30px, single-column everything
- Intern grid: 1 column, full-width cards
- Pricing table: stacked vertically with toggle between plans
- CTAs: full-width buttons (48px height minimum for tap targets)
- Footer: single column

### 3.4 Layout Patterns

**Hero Section**:
- Headline centered, or left-aligned with right-side visual
- Subheadline narrower (max 80 characters, ~600px width)
- CTA button below or aligned with content
- Visual (CLI demo or intern carousel) full-width or right 50%

**Section Layout** (How It Works, Features):
- Left-aligned text, right-side visual (alternating)
- Or: Full-width visual (top), text below

**Intern Gallery**:
- Grid card layout, equal height, hover lift effect
- Card shadow: subtle (0 4px 6px rgba(0,0,0,0.1))
- On hover: scale(1.02), shadow increase

**Pricing Section**:
- 3-column cards side-by-side (desktop)
- Most popular plan: background color (#1a1a1a) or border highlight
- Table: sticky header on scroll, scrollable on mobile

### 3.5 Animation & Interaction

**Micro-interactions**:
- Button hover: color shift + subtle scale (1.05x) + shadow increase
- CTA buttons: pulse animation (subtle glow) on page load
- Intern cards: scale on hover, skill badges fade in
- Accordion (FAQ): smooth expand/collapse (200–300ms ease)
- Scroll effects: fade-in on section entry (optional, don't overuse)

**Transitions**:
- Duration: 150–300ms for UI elements
- Easing: ease-out for entrances, ease-in for exits
- Avoid: jarring movement, more than 3 simultaneous animations per section

**Video/GIFs**:
- CLI demo in hero: looping, 3–5 seconds, no sound required
- Fallback: static screenshot if video fails

### 3.6 Dark Mode (Default)

- Background: #0a0a0a or #111111
- Cards/containers: #1a1a1a
- Text: #ffffff (primary), #9ca3af (secondary)
- Borders: #4a4a4a
- Accent: #0080FF (electric blue pops on dark)
- Code blocks: #0a0a0a background with #10b981 (green) for syntax

**System Preference Detection**: Use `prefers-color-scheme: dark` CSS media query.
**Light Mode Toggle**: Optional (but respect system preference on first load).

---

## 4. SEO & Meta

### 4.1 Page Title & Meta

**Page Title** (55–60 chars):
```
InternsMarket: AI Intern CLI — Install & Deploy Autonomous Agents
```

**Meta Description** (155–160 chars):
```
Hire autonomous AI interns with personalities, skills & memory. Install via CLI in 60 seconds. Free tier: $0. Starter: $9/mo.
```

**OG Title**:
```
InternsMarket: Your Personal AI Team in One Click
```

**OG Description**:
```
Deploy specialized AI agents: content marketing, DevOps, code review, data analysis & more. Installed as a CLI. Zero prompting required.
```

**OG Image**: 1200x630px. Show:
- InternsMarket logo + "Hire, train & deploy your personal AI intern"
- CLI command (`im install content-marketing-intern`)
- 3–4 intern avatars

### 4.2 Target Keywords

**Primary**:
- AI intern CLI
- autonomous AI agent
- AIEOS marketplace
- AI tool installer

**Secondary**:
- Content marketing AI
- DevOps automation AI
- Code review agent
- Data analysis AI

**Long-tail**:
- "Replace freelance writer with AI"
- "Deploy autonomous marketing agent CLI"
- "Install AI persona no fine-tuning"

### 4.3 Structured Data (Schema.org)

Implement JSON-LD for:

**SoftwareApplication**:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "InternsMarket",
  "description": "CLI marketplace for AI intern personas",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Node.js 20+",
  "url": "https://internsmarket.com",
  "downloadUrl": "https://www.npmjs.com/package/internsmarket",
  "offers": [
    {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "name": "Free"
    },
    {
      "@type": "Offer",
      "price": "9",
      "priceCurrency": "USD",
      "name": "Starter"
    }
  ]
}
```

**Breadcrumb Navigation**: Home > Pricing, Home > Docs, etc.

---

## 5. Technical Recommendations

### 5.1 Recommended Tech Stack

**Frontend Framework**:
- **Next.js 15** (App Router, SSR/SSG, Vercel deployment ready)
- OR **Astro** (static-friendly, minimal JS, fast)
- OR **Plain HTML + Tailwind CSS** (no build step, simplest)

**Rationale for developers**:
- Next.js: familiar to Node/TypeScript developers, easy hosting on Vercel
- Astro: optimized for content-heavy pages, great for static marketing sites
- Plain HTML: simplest, fastest (but harder to maintain)

**CSS Framework**: Tailwind CSS (utility-first, dark mode support built-in)

**Component Library** (optional):
- shadcn/ui (headless, dark-friendly, accessible)
- Or: build custom components (keep it minimal for landing page)

**Analytics**:
- Vercel Web Analytics (if using Next.js + Vercel)
- Google Analytics 4 (gtag)
- Plausible (privacy-focused alternative)

**Form Handling** (post-install sign-up only):
- Formspree (simple email forms)
- Netlify Forms (if using Netlify)
- Custom backend (Node.js + email service)

**Email Service**:
- Mailchimp API (newsletter)
- SendGrid (transactional)

### 5.2 Performance Targets

**Core Web Vitals** (Google PageSpeed Insights targets):

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) / Interaction to Next Paint (INP) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |

**Page Size**: < 500KB (initial load, gzip)
**First Contentful Paint (FCP)**: < 1.8s

**Optimization Tactics**:
- Lazy-load intern grid images (Intersection Observer or native `loading="lazy"`)
- Optimize hero video/GIF (WebP format, < 3MB)
- Minify CSS/JS
- Use CDN (Vercel, Cloudflare, AWS CloudFront)
- Tree-shake unused CSS

### 5.3 Analytics Setup

**Goals to Track**:
1. **Visitor → Install**: Click "Install Free" button
2. **Visitor → Upgrade**: Click pricing "Upgrade" button
3. **Visitor → Docs**: Click "Docs" link
4. **Page Scroll**: Track how far users scroll
5. **Form Submit**: Newsletter signup (if included)

**Events to Log**:
```javascript
// Example (GTM / GA4)
gtag('event', 'install_click', { location: 'hero' });
gtag('event', 'upgrade_click', { plan: 'starter' });
gtag('event', 'scroll', { depth: 50 }); // 50% of page
```

**Heatmaps** (optional): Hotjar or Microsoft Clarity to see where users click/drop.

### 5.4 A/B Testing Opportunities

**High-Impact Tests**:

1. **Hero Headline** (Primary conversion driver)
   - Variant A: "Hire, train & deploy your personal AI intern in one click"
   - Variant B: "Meet your new AI team member. Install her in 60 seconds."
   - Metric: Click to "Install" CTA

2. **CTA Button Copy**
   - Variant A: "Install Free"
   - Variant B: "Get Started Free"
   - Variant C: "Try Now"
   - Metric: Click-through rate

3. **Intern Visibility**
   - Variant A: Show all 11 interns upfront
   - Variant B: Show 3 free tier only, collapse others
   - Metric: Time on page, scroll depth to pricing

4. **Pricing Highlight**
   - Variant A: Starter tier highlighted (most popular)
   - Variant B: Pro tier highlighted
   - Metric: Upgrade intent (pixel tracking)

5. **Social Proof Position**
   - Variant A: Social proof in hero (top)
   - Variant B: Social proof after "How It Works"
   - Metric: Conversion rate

**Test Duration**: Minimum 2–4 weeks per test (statistical significance).

---

## 6. Conversion Optimization Strategy

### 6.1 Primary CTA Flow

**Goal**: Free tier installation (no payment friction)

**User Journey**:
```
Land on page
    ↓
Read hero headline + subheadline (5 sec)
    ↓
Click "Install Free" → npm install page (copy to clipboard)
    ↓
In terminal: npm install -g internsmarket
    ↓
Run: im setup (account creation in CLI, not on web)
    ↓
Account created, Free tier activated (1 intern limit)
    ↓
Browser: Prompt to install first intern (email follow-up)
```

**Design Support**:
- Hero CTA button prominent, blue, above fold
- Subheadline removes friction: "60 seconds", "no credit card"
- Post-install email with next steps (install first intern, choose between 3 free)

### 6.2 Secondary CTA Flow

**Goal**: Starter tier upgrade ($9/mo, 5 interns)

**Trigger**: User tries to install 2nd intern, hits limit.

**User Journey**:
```
User installs 1st intern (Jordan)
    ↓
Try to install 2nd intern → "You have 1/1 free intern installed"
    ↓
Upgrade prompt shown → Link to pricing page
    ↓
Click "Upgrade" → Lemon Squeezy checkout
    ↓
Enter payment → Starter tier activated
    ↓
Return to CLI, unlock 4 more interns
```

**Design Support**:
- Pricing table prominently placed (section 2 of page)
- Starter tier color-highlighted (blue, "Most Popular" badge)
- Clear feature comparison: Free (1) vs Starter (5) vs Pro (Unlimited)

### 6.3 Tertiary CTA Flow

**Goal**: Pro tier visibility ($19/mo, unlimited interns)

**Trigger**: User on Starter wants Sofia (Pro-only intern) or unlimited scale.

**Design Support**:
- Sofia Reyes marked Pro-only on catalog
- Pricing page shows Pro benefits: "Unlimited interns", "Custom integrations"
- Email sequence after Starter signup: "Advanced use cases" guide (case studies with Pro-tier internals)

### 6.4 Lead Capture Approach

**Strategy**: Minimize friction on landing page. Collect email post-install.

**Methods**:
- **Modal post-install**: "Welcome! Get tips on using your first intern" (email capture)
- **In-app CLI**: `im setup` collects email for account
- **Newsletter opt-in**: Footer section (low-friction, not required)

**Email Sequence** (post-install):
1. Welcome + setup guide (Day 1)
2. "Your first intern is ready" + quick-start (Day 2)
3. "3 workflows to try" + case study (Day 5)
4. Upgrade prompt (if on Free tier) (Day 14)

### 6.5 Funnel Analysis

**Conversion Targets**:

| Stage | Event | Target Rate | Notes |
|-------|-------|-------------|-------|
| Page view | Session | 100% | All traffic |
| Hero CTA click | Click "Install Free" | 15–20% | Top engagement |
| npm install | Begin install | 8–10% | Of clicks |
| CLI setup complete | Account created | 5–7% | Of installs |
| 1st intern installed | `im install` | 4–5% | Active users |
| 2nd intern attempt | Hits limit | 2–3% | Upgrade intent |
| Upgrade to Starter | Payment | 0.5–1% | Of installs | Overall conversion: install → paid = **0.5–1%** (industry benchmark for dev tools: 0.3–1%)

**Optimization Levers**:
- **Increase installs**: Better hero copy, clearer value prop
- **Increase upgrade rate**: Smoother onboarding (show limit at install #2, not later)
- **Increase LTV**: Email sequence, feature releases, community engagement

---

## 7. Intern Showcase Strategy

### 7.1 Individual Intern Pages

**Optional, if resources allow**: Each of the 11 interns gets a dedicated page.

**URL Structure**: `/interns/{intern-id}` (e.g., `/interns/jordan-lee`)

**Page Sections**:

1. **Hero**: Intern name, role, avatar, "Install Now" CTA
2. **Bio**: 2–3 sentences on personality, specialty, background
3. **Skills**: All skills listed with 1-line description each
4. **Testimonial** (if available): User quote
5. **In Action**: Code example showing intern being used
6. **Tier**: Price, which tier unlocks this intern
7. **Next Steps**: "Install" button, link back to catalog

### 7.2 Intern Card Design Spec

**On Landing Page Catalog Section**:

```
Card dimensions: 280px × 320px (desktop), responsive on mobile

┌────────────────────────────┐
│  [Avatar - 80px circle]    │  ← Unique illustration per intern
│         Jordan             │  ← Name, bold
│    Content Marketing       │  ← Role, secondary text
│                            │
│  Tier: Free                │  ← Green badge for Free
│                            │
│  Skills:                   │
│  • Blog Strategy           │  ← Top 3–4 skills, truncated
│  • SEO Optimization        │
│  • Brand Voice             │
│  • [+2 more]               │  ← Link to full list
│                            │
│  "Obsessed with clarity    │  ← 2-line personality quote
│   and human-centered copy" │
│                            │
│  [Install] [Learn More]    │  ← CTAs
└────────────────────────────┘
```

### 7.3 Filtering & Categorization

**Primary Filter**: By Tier
- Buttons: "All", "Free", "Starter", "Pro"
- Default: "All"

**Secondary Filter** (optional): By Role
- Tabs: "All", "Content", "Dev", "Ops", "Analytics", "Design"

**Implementation**: Client-side filter (no page reload) or URL params (`?tier=starter&role=dev`)

### 7.4 "Try It" Interaction Concept

**Idea**: Click an intern card to preview personality in a small modal.

```
Modal (400px wide):
┌────────────────────────────────┐
│  [X] Close                     │
│  🤖 Jordan Lee                 │
│  Content Marketing Intern      │
│                                │
│  INPUT: "Write a blog post    │
│  about AI for beginners"       │
│                                │
│  OUTPUT (simulated):           │
│  "I'd love to help! Here's     │
│   what I'd focus on...         │
│   [sample output]"             │
│                                │
│  [Install This Intern]         │
└────────────────────────────────┘
```

**Rationale**: Shows actual personality before install, lowers adoption risk.

### 7.5 Personality Preview Idea

**Alternative to modal**: Interactive chat preview.

- Load intern config in JavaScript
- Simulate simple responses based on personality traits
- Show "voice" sample (idiolect, text style)
- Not actual inference — just personality visualization

**Example**:
- Jordan (creative + empathetic) might respond: "I absolutely love this idea! Here's how I'd approach it..."
- Marcus (logical + reliable) might respond: "Analyzing requirements. Priority: uptime, scalability, cost-efficiency."

---

## 8. Additional Sections (Optional, Phase 2)

### 8.1 Blog / Case Studies
- Link in footer + navigation
- Post examples: "How we replaced our freelance copywriter", "DevOps automation with Marcus"

### 8.2 Video Walkthrough
- 60–90 second demo of `im` CLI commands
- Upload to YouTube or Vimeo, embed in hero

### 8.3 Comparison Chart
- InternsMarket vs. ChatGPT, Claude, other AI agent platforms
- Highlight: personality, autonomy, CLI-native, pricing

### 8.4 Integrations Page
- Show supported runtimes (ZeroClaw, OpenClaw)
- Plugins / third-party integrations (Stripe, Notion, etc.)

---

## 9. Implementation Roadmap

### Phase 1 (MVP Landing Page)
- [ ] Hero section + primary CTA
- [ ] How It Works (3 steps)
- [ ] Intern Catalog (11 cards with tier filtering)
- [ ] Pricing section (3-tier table)
- [ ] FAQ (8–10 questions)
- [ ] Footer
- [ ] Mobile responsive (< 640px)
- [ ] Dark mode default
- [ ] GA4 + event tracking
- Estimated effort: 2–3 weeks

### Phase 2 (Optimizations)
- [ ] Individual intern pages
- [ ] Intern preview modal
- [ ] Social proof section (testimonials, GitHub stars)
- [ ] Blog section
- [ ] Video demo
- [ ] A/B tests (hero copy, CTA text, pricing highlight)
- Estimated effort: 2–4 weeks

### Phase 3 (Advanced)
- [ ] Interactive pricing calculator
- [ ] Live chat / Intercom
- [ ] Webinar / case study videos
- [ ] Affiliate program landing page
- [ ] Newsletter with Substack integration
- Estimated effort: 3–4 weeks

---

## 10. Success Metrics

### Month 1 (Soft Launch)
- **Unique visitors**: 500–1K (from Twitter, GitHub, Discord, email)
- **Install rate**: 10–15% (click → npm install)
- **Conversion rate** (install → Free account): 5–7%
- **Upgrade rate** (Free → Starter): 0.5–1%
- **MRR** (Month 1): $100–300 (20–30 Starter subscribers)

### Month 3 (Post-Optimization)
- **Unique visitors**: 3K–5K (SEO, social, community)
- **Install rate**: 15–20%
- **Conversion rate**: 6–8%
- **Upgrade rate**: 1–2%
- **MRR**: $500–1K

### Month 6 (Scale)
- **Unique visitors**: 10K+ (SEO ranking, brand awareness)
- **Install rate**: 20%+
- **Conversion rate**: 8–10%
- **Upgrade rate**: 2–3%
- **MRR**: $2K–5K

### Key Metrics to Track Always
- Page load time (LCP < 2.5s)
- Bounce rate (target: < 40%)
- Time on page (target: > 2m)
- Scroll depth (target: 60%+ to pricing)
- CTA click-through rate (target: > 15% on hero)
- Post-install email open rate (target: > 40%)

---

## 11. Unresolved Questions

1. **Intern avatars**: Should each intern have a unique illustration, or use AI-generated avatars? Timeline & budget for commissioning art?
2. **Video demo**: Should we record a CLI demo walkthrough, or create an animated explainer? Who owns production?
3. **Social proof**: Do we have early user testimonials? If not, when will we collect them?
4. **Enterprise page**: Should there be a dedicated enterprise landing page, or handle via email contact form?
5. **Newsletter**: Is the Mailchimp integration already set up, or does this need to be built?
6. **Analytics**: Google Analytics 4 already configured? Should we use Vercel Analytics or third-party?
7. **Lemon Squeezy integration**: Is the checkout flow already implemented, or does this need to be wired up post-launch?
8. **Domain**: Is internsmarket.com registered and DNS configured? Any SSL certificate setup needed?

---

**Document prepared by**: Research Agent
**Date**: 2026-02-25
**Status**: Ready for design/implementation handoff
