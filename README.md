# InternsMarket CLI

> Hire, train & deploy your personal AI intern in one click.

**InternsMarket** sells AIEOS-powered AI intern personas as CLI-installable packages. Interns are full autonomous agents with skills, memory, personality, and voice. Think "Shopify Themes for AI Agents."

## Quickstart (60 seconds)

```bash
npm install -g internsmarket
im setup
im install content-marketing-intern
im apply content-marketing-intern
```

That's it. Jordan (our launch intern) is now running in your ZeroClaw runtime.

## What's an AI Intern?

An AI Intern is a complete AIEOS v1.1 entity — a persona with:
- **Personality** (neural matrix traits: creativity, empathy, logic, adaptability, charisma, reliability)
- **Voice** (idiolect, text style, typing quirks)
- **Skills** (5+ specialized abilities per intern)
- **Memory** (brand voice guidelines, content strategy templates)

You can install multiple interns, each running in parallel. Each is independently licensable.

## Commands

| Command | Purpose |
|---------|---------|
| `im setup` | Interactive wizard to install runtimes (ZeroClaw, OpenClaw) |
| `im install <id>` | Install an intern from registry or local path (`--local`, `--force`) |
| `im update [id]` | Update one or all installed interns |
| `im remove <id>` | Remove an installed intern |
| `im list` | Show all installed interns + versions |
| `im activate` | Activate a Lemon Squeezy license key |
| `im status` | Show tier + installed intern count |
| `im apply <id>` | Generate runtime config for ZeroClaw or OpenClaw |

## Pricing

| Tier | Price | Limit | Use Case |
|------|-------|-------|----------|
| **Free** | $0 | 1 intern | Try it out |
| **Starter** | $9/mo | 5 interns | Small team automation |
| **Pro** | $19/mo | Unlimited | Agency / Enterprise |

Upgrade at [internsmarket.com/upgrade](https://internsmarket.com).

## Docs

- **[System Architecture](./docs/system-architecture.md)** — Monorepo layout, data flow, AIEOS schema, runtime adapters
- **[Code Standards](./docs/code-standards.md)** — ESM, TypeScript strict, 200-line file limit, testing patterns
- **[CLI Reference](./docs/cli-reference.md)** — All commands with flags, examples, error handling
- **[Intern Authoring Guide](./docs/intern-authoring-guide.md)** — Create a `.intern` package (manifest, aieos, skills, memory)
- **[Deployment Guide](./docs/deployment-guide.md)** — Bundle, host, and publish interns to the registry

## Tech Stack

- **Runtime**: Node.js 20+ (ESM-only)
- **CLI**: Commander + Ink v5 (React-based TUI)
- **Types**: TypeScript strict mode
- **Validation**: Zod
- **Package Format**: `.intern` bundles (tar.gz)
- **Payment**: Lemon Squeezy API
- **Targets**: ZeroClaw & OpenClaw runtimes

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm test

# Type check
npm run lint

# Watch mode (core + cli)
npm run dev
```

## Repository Layout

```
internsmarket/
├── packages/
│   ├── core/          # AIEOS types, validators, compilers
│   ├── cli/           # InternsMarket CLI tool (Commander + Ink)
│   └── interns/       # .intern bundles (content-marketing-intern/)
├── docs/              # User & developer documentation
├── plans/             # Development phase tracking & reports
└── package.json       # npm workspaces root
```

## License

Proprietary. InternsMarket CLI and all interns are closed-source for MVP.

## Support

- **Discord**: [internsmarket.com/discord](https://internsmarket.com/discord)
- **X/Twitter**: [@internsmarket](https://x.com/internsmarket)
- **GitHub Issues**: [github.com/internsmarket/cli/issues](https://github.com/internsmarket/cli/issues)
