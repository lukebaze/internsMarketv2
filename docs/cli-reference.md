# CLI Reference

Complete command reference for the `im` CLI tool.

## Installation

```bash
npm install -g internsmarket
# or
npm install internsmarket  # locally in a project
```

Verify:
```bash
im --version  # 0.1.0
im --help     # show all commands
```

## Global Options

All commands support:

| Option | Purpose |
|--------|---------|
| `--help` | Show command help |
| `--version` | Show CLI version |

## setup

Interactive onboarding wizard to install runtimes (ZeroClaw & OpenClaw).

### Usage

```bash
im setup                          # Interactive wizard mode
im setup --runtime zeroclaw       # Direct install (skip wizard)
im setup --yes                    # Auto-confirm, install all missing runtimes
```

### Options

| Flag | Type | Purpose |
|------|------|---------|
| `-r, --runtime <runtime>` | string | Skip wizard, directly install: `zeroclaw` or `openclaw` |
| `-y, --yes` | boolean | Non-interactive; auto-install all missing runtimes |

### Interactive Mode

```
InternsMarket Setup
─────────────────────

Welcome! This wizard will help you set up a runtime for your AI interns.

Runtimes are the engines that run your AI intern personas.
You need at least one installed to use your interns.

Press Enter to continue, or q to quit
```

Then select from available runtimes:

```
Select runtimes to install (Space to toggle, Enter to confirm):

> [x] ZeroClaw — Lightweight Rust agent runtime
  [ ] OpenClaw — Multi-channel AI assistant platform

  Install 1 runtime

↑/↓ Navigate  Space Toggle  Enter Confirm  q Quit
```

### Examples

```bash
# Interactive wizard (recommended first-time)
im setup

# Install ZeroClaw only, skip wizard
im setup --runtime zeroclaw

# Auto-install all missing runtimes (CI/CD friendly)
im setup --yes
```

### Output

```
InternsMarket Setup
ZeroClaw: installed successfully
OpenClaw: already installed

Next: im install <intern-id> to install your first AI intern
```

## install

Install an AI intern from the registry or a local directory.

### Usage

```bash
im install <intern-id> [options]
```

### Options

| Flag | Type | Default | Purpose |
|------|------|---------|---------|
| `-f, --force` | boolean | false | Overwrite if already installed |
| `-l, --local <path>` | string | — | Install from local directory (dev mode) |
| `-r, --runtime <runtime>` | string | `zeroclaw` | Target runtime: `zeroclaw` or `openclaw` |

### Examples

```bash
# Install from registry
im install content-marketing-intern

# Install from local directory (development)
im install content-marketing-intern --local ./packages/interns/content-marketing-intern

# Overwrite existing installation
im install content-marketing-intern --force

# Install for OpenClaw runtime
im install content-marketing-intern --runtime openclaw
```

### Output

```
InternsMarket Install
Installing content-marketing-intern...
[████████░░░░░░░░░░░░] 50% Extracting files...

✓ Jordan Lee — Content Marketing Intern installed successfully!
To activate in ZeroClaw, run:
  im apply content-marketing-intern --runtime=zeroclaw
```

### Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `Tier required: pro` | License doesn't allow this intern | Upgrade at https://internsmarket.com/upgrade |
| `Network error` | Can't reach registry | Check internet; retry in 30s |
| `Invalid manifest` | Package is malformed | Re-download or report issue |
| `Already installed` | Intern exists | Use `--force` to overwrite |

## update

Update one or all installed interns to latest version.

### Usage

```bash
im update [intern-id]
```

### Options

None. Specify intern ID to update one; omit to update all.

### Examples

```bash
# Update one intern
im update content-marketing-intern

# Update all interns
im update
```

### Output

```
InternsMarket Update
Checking for updates...

content-marketing-intern: 1.0.0 → 1.1.0
  ✓ Updated
```

## remove

Uninstall an intern.

### Usage

```bash
im remove <intern-id>
```

### Examples

```bash
im remove content-marketing-intern
```

### Output

```
InternsMarket Remove
✓ content-marketing-intern removed.
```

## list

Show all installed interns with versions and tiers.

### Usage

```bash
im list
```

### Examples

```bash
im list
```

### Output

```
InternsMarket Installed Interns

Name                                Version  Tier      Runtime
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Jordan Lee — Content Marketing     1.0.0    free      zeroclaw
```

### Tip

If no interns are installed, prompts to `im install <id>`.

## activate

Activate a Lemon Squeezy license key.

### Usage

```bash
im activate
```

### Examples

```bash
im activate
```

### Interactive Flow

```
InternsMarket Activate

Enter your Lemon Squeezy license key:
> xxx-xxx-xxx-xxx

✓ License activated!
Tier: Starter
Interns allowed: 5

To install additional interns:
  im install <intern-id>
```

### Tier Information

| Tier | Limit | Cost | Upgrade |
|------|-------|------|---------|
| Free | 1 intern | $0 | Already active |
| Starter | 5 interns | $9/mo | https://internsmarket.com/upgrade |
| Pro | Unlimited | $19/mo | https://internsmarket.com/upgrade |

### Offline Mode

If you're offline when activating:
- Cannot verify license (requires network)
- Last valid tier cached for 3 days
- Tier reverts to Free after 3 days offline

## status

Show current license tier and installed intern count.

### Usage

```bash
im status
```

### Examples

```bash
im status
```

### Output (Free Tier)

```
InternsMarket Status

License Tier: Free
Interns Installed: 1 / 1

Next upgrade:
  Starter ($9/mo) — 5 interns
  https://internsmarket.com/upgrade
```

### Output (Starter Tier)

```
InternsMarket Status

License Tier: Starter
Interns Installed: 3 / 5

Slots available: 2

To install more:
  im install <intern-id>
```

## apply

Generate runtime configuration for an installed intern.

### Usage

```bash
im apply <intern-id> [options]
```

### Options

| Flag | Type | Default | Purpose |
|------|------|---------|---------|
| `-r, --runtime <runtime>` | string | `zeroclaw` | Target: `zeroclaw` or `openclaw` |

### Examples

```bash
# Apply for ZeroClaw (default)
im apply content-marketing-intern

# Apply for OpenClaw
im apply content-marketing-intern --runtime openclaw
```

### Output (ZeroClaw)

```
InternsMarket Apply

Generating ZeroClaw config for Jordan Lee...

✓ Config generated!
Location: ~/.internsmarket/interns/content-marketing-intern/config/zeroclaw.toml

To use in your ZeroClaw agent:
  1. Copy the file to your ZeroClaw config directory
  2. Load it in your agent initialization
  3. Jordan will now respond with her personality & skills
```

### Output (OpenClaw)

```
InternsMarket Apply

Generating OpenClaw config for Jordan Lee...

✓ Config generated!
Location: ~/.internsmarket/interns/content-marketing-intern/config/

Files created:
  - openclaw.yaml (system prompt)
  - identity.json (personality traits)

To use in your OpenClaw runtime:
  1. Point your agent config to these files
  2. Restart your agent
  3. Jordan will respond with her personality & skills
```

## Help & Debugging

### Get help for a command

```bash
im install --help
im activate --help
```

### Check CLI version

```bash
im --version
```

### List all commands

```bash
im --help
```

### Debug: Check installed interns

```bash
im list
```

### Debug: Check license status

```bash
im status
```

### Debug: Reinstall after corruption

```bash
# Remove and reinstall
im remove content-marketing-intern
im install content-marketing-intern --force
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Command failed (invalid input, missing intern, license error, etc.) |
| `2` | Invalid usage (wrong flags, missing args) |

## Environment Variables

| Var | Purpose |
|-----|---------|
| `INTERNSMARKET_CONFIG_DIR` | Override config directory (default: XDG standard) |
| `INTERNSMARKET_DATA_DIR` | Override installed interns directory |

## API Details

### Registry URL

Default registry: `https://registry.internsmarket.com/`

Manifest endpoint: `https://registry.internsmarket.com/manifests/{intern-id}.json`

Tarball endpoint: `https://registry.internsmarket.com/bundles/{intern-id}-{version}.tar.gz`

### License Validation

Lemon Squeezy API: `https://api.lemonsqueezy.com/v1/...`

Cache: 24h TTL for valid licenses, 3-day grace period on network failure.

### Config Storage

**macOS**: `~/Library/Preferences/internsmarket-nodejs/config.json`

**Linux**: `~/.config/internsmarket/config.json`

**Windows**: `%APPDATA%\internsmarket\config.json`

Installed interns: `{XDG_DATA_HOME}/internsmarket/interns/`

## Troubleshooting

### "Tier required: pro"

**Problem**: You tried to install a pro-only intern with Free tier.

**Solution**: Upgrade at https://internsmarket.com/upgrade

### "Network error"

**Problem**: Can't reach registry or Lemon Squeezy.

**Solution**:
- Check internet connection
- If you've installed before, existing interns still work (offline mode)
- Retry in 30 seconds

### "Already installed"

**Problem**: Intern is already installed.

**Solution**: Use `--force` to overwrite: `im install content-marketing-intern --force`

### "Invalid manifest"

**Problem**: Downloaded intern package is corrupted.

**Solution**:
- Try removing and reinstalling: `im remove <id> && im install <id> --force`
- Report issue: https://github.com/internsmarket/cli/issues

### License key not working

**Problem**: License key is invalid or expired.

**Solution**:
- Verify key from Lemon Squeezy email
- Ensure no typos when running `im activate`
- Check license status: `im status`
- Contact support: https://internsmarket.com/support
