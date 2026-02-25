# Deployment Guide

How to deploy InternsMarket products: CLI, website, and AI intern packages.

## Overview

Publishing an intern has three steps:

1. **Bundle**: Create a tarball (`.tar.gz`) from your `.intern` directory
2. **Host**: Upload to a CDN or static file host
3. **Register**: Add entry to the manifest registry JSON

## Prerequisites

- A completed `.intern` package (see [Intern Authoring Guide](./intern-authoring-guide.md))
- Validation passes: `im validate ./your-intern` exits 0
- A hosting provider (GitHub Pages, Vercel, S3, etc.)
- Lemon Squeezy account (for license configuration)

## Step 1: Bundle Your Intern

### Create the Tarball

```bash
cd packages/interns
tar -czf content-marketing-intern-1.0.0.tar.gz content-marketing-intern/
```

Output: `content-marketing-intern-1.0.0.tar.gz` (typically 1-5 MB)

### Verify

```bash
tar -tzf content-marketing-intern-1.0.0.tar.gz | head -10
# Should list:
# content-marketing-intern/manifest.json
# content-marketing-intern/aieos.json
# content-marketing-intern/skills/...
# content-marketing-intern/config/...
```

### Format

Filename: `{intern-id}-{version}.tar.gz`

Examples:
- `content-marketing-intern-1.0.0.tar.gz`
- `data-analyst-intern-2.1.3.tar.gz`
- `social-media-manager-1.0.0-beta.1.tar.gz`

## Step 2: Host the Tarball

Choose a hosting provider for the CDN:

### Option A: GitHub Releases (Free, Easy)

```bash
# 1. Create a GitHub repo (or add to existing one)
git remote add origin https://github.com/you/interns
git checkout -b release/content-marketing-1.0.0
git add content-marketing-intern-1.0.0.tar.gz
git commit -m "chore: release content-marketing-intern@1.0.0"
git push -u origin release/content-marketing-1.0.0

# 2. Create GitHub Release
# Via GitHub UI: Releases → New Release
# Tag: v1.0.0
# Release name: Content Marketing Intern v1.0.0
# Attach the .tar.gz file
# Publish

# 3. Get URL (shown in release page)
# https://github.com/you/interns/releases/download/v1.0.0/content-marketing-intern-1.0.0.tar.gz
```

### Option B: GitHub Pages (Free, Static)

```bash
# 1. Enable GitHub Pages on your repo
# Settings → Pages → Source: main branch /docs folder

# 2. Create /docs/bundles/ directory
mkdir -p docs/bundles
cp content-marketing-intern-1.0.0.tar.gz docs/bundles/

# 3. Commit and push
git add docs/bundles/content-marketing-intern-1.0.0.tar.gz
git commit -m "chore: add content-marketing-intern bundle"
git push

# 4. Get URL
# https://you.github.io/interns/bundles/content-marketing-intern-1.0.0.tar.gz
```

### Option C: Vercel (Free, CDN)

```bash
# 1. Connect your repo to Vercel
# vercel.com → New Project

# 2. Create vercel.json
cat > vercel.json <<EOF
{
  "public": true,
  "rewrites": [
    {
      "source": "/bundles/:path*",
      "destination": "/:path*"
    }
  ]
}
EOF

# 3. Commit and push
git add vercel.json
git push

# Vercel auto-deploys; get URL:
# https://your-project.vercel.app/bundles/content-marketing-intern-1.0.0.tar.gz
```

### Option D: AWS S3 (Paid, Scalable)

```bash
# 1. Create S3 bucket (public)
aws s3 mb s3://internsmarket-bundles

# 2. Make bucket public (bucket policy)
aws s3api put-bucket-policy --bucket internsmarket-bundles \
  --policy '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::internsmarket-bundles/*"
    }]
  }'

# 3. Upload file
aws s3 cp content-marketing-intern-1.0.0.tar.gz \
  s3://internsmarket-bundles/bundles/content-marketing-intern-1.0.0.tar.gz \
  --acl public-read

# 4. Get URL
# https://internsmarket-bundles.s3.amazonaws.com/bundles/content-marketing-intern-1.0.0.tar.gz
```

## Step 3: Register in the Registry

The registry is a static JSON file listing all available interns.

### Registry Structure

File: `manifests/registry.json` (hosted at `https://registry.internsmarket.com/registry.json`)

```json
{
  "version": "1.0",
  "last_updated": "2026-02-25T10:00:00Z",
  "interns": [
    {
      "id": "content-marketing-intern",
      "name": "Jordan Lee — Content Marketing Intern",
      "description": "Writes blogs, social posts, email sequences, and SEO copy.",
      "author": "InternsMarket",
      "version": "1.0.0",
      "manifest_url": "https://registry.internsmarket.com/manifests/content-marketing-intern.json",
      "tarball_url": "https://bundles.internsmarket.com/content-marketing-intern-1.0.0.tar.gz",
      "tags": ["content", "marketing", "seo"],
      "tier_required": "free",
      "created_at": "2026-02-25",
      "published_at": "2026-02-25"
    }
  ]
}
```

### Individual Manifest Files

For each intern, also publish `manifests/{intern-id}.json`:

```json
{
  "id": "content-marketing-intern",
  "name": "Jordan Lee — Content Marketing Intern",
  "version": "1.0.0",
  "description": "Writes blogs, social posts, email sequences, and SEO copy.",
  "author": "InternsMarket",
  "license": "proprietary",
  "aieos_version": "1.1",
  "supported_runtimes": ["zeroclaw", "openclaw"],
  "primary_runtime": "zeroclaw",
  "tags": ["content", "marketing", "seo", "social-media", "email"],
  "tier_required": "free",
  "skills": ["blog-post-writer", "social-media-content", "email-copywriter", "seo-keyword-researcher", "content-repurposer"],
  "created_at": "2026-02-25",
  "registry_url": "https://registry.internsmarket.com/manifests/content-marketing-intern.json",
  "tarball_url": "https://bundles.internsmarket.com/content-marketing-intern-1.0.0.tar.gz"
}
```

### How the CLI Uses the Registry

```
User: im install content-marketing-intern

1. CLI fetches: https://registry.internsmarket.com/manifests/content-marketing-intern.json
2. Reads "tarball_url": "https://bundles.internsmarket.com/content-marketing-intern-1.0.0.tar.gz"
3. Downloads tarball, extracts, validates
4. Installs to ~/.internsmarket/interns/
```

## Versioning

### Semantic Versioning (Semver)

Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes (removing skills, renaming fields)
- **MINOR** (1.0.0 → 1.1.0): New features (new skills, expanded AIEOS layers)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (typos, tweaks, accuracy improvements)

### Release Checklist

When releasing a new version:

- [ ] Bump version in `manifest.json`
- [ ] Update `created_at` (or add `modified_at`)
- [ ] Create new tarball: `intern-id-{new-version}.tar.gz`
- [ ] Run validation: `im validate ./your-intern` → exits 0
- [ ] Upload tarball to CDN
- [ ] Update registry JSON (add new entry or modify existing)
- [ ] Test: `im install intern-id` (should fetch new version)
- [ ] Tag in git: `git tag v1.1.0 && git push --tags`

## CI/CD Integration (Optional)

### GitHub Actions Example

Create `.github/workflows/publish-intern.yml`:

```yaml
name: Publish Intern

on:
  push:
    tags:
      - 'content-marketing-intern-v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Extract version
        run: |
          VERSION=${GITHUB_REF#refs/tags/content-marketing-intern-v}
          echo "VERSION=$VERSION" >> $GITHUB_ENV

      - name: Validate
        run: |
          npm install
          npm run build
          npm test
          npx im validate ./packages/interns/content-marketing-intern

      - name: Create tarball
        run: |
          cd packages/interns
          tar -czf content-marketing-intern-${{ env.VERSION }}.tar.gz content-marketing-intern/

      - name: Upload to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp packages/interns/content-marketing-intern-${{ env.VERSION }}.tar.gz \
            s3://internsmarket-bundles/bundles/ --acl public-read

      - name: Update registry
        run: |
          # Script to update registry JSON
          ./scripts/update-registry.sh content-marketing-intern ${{ env.VERSION }}
          git add registry.json
          git commit -m "chore: register content-marketing-intern@${{ env.VERSION }}"
          git push

      - name: Create GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: content-marketing-intern-v${{ env.VERSION }}
          release_name: Content Marketing Intern v${{ env.VERSION }}
          draft: false
          prerelease: false
```

## Lemon Squeezy Configuration

Each intern tier is configured in Lemon Squeezy:

### Creating Products

1. Go to **Products** in Lemon Squeezy
2. Create a product for each tier:
   - `InternsMarket Starter` ($9/mo, variant_id: 123456)
   - `InternsMarket Pro` ($19/mo, variant_id: 123457)
3. Record variant IDs in `license-constants.ts`:

```typescript
export const VARIANT_TIER_MAP: Record<string, Tier> = {
  '123456': 'starter',  // $9/mo → 5 interns
  '123457': 'pro',      // $19/mo → unlimited
};
```

## Troubleshooting

### Tarball Extraction Fails

**Problem**: `tar: unexpected end of file`

**Solution**: Tarball is corrupted. Re-create:
```bash
rm content-marketing-intern-1.0.0.tar.gz
tar -czf content-marketing-intern-1.0.0.tar.gz content-marketing-intern/
tar -tzf content-marketing-intern-1.0.0.tar.gz  # verify
```

### Registry URL 404

**Problem**: `Error: Failed to fetch registry`

**Solution**: Check manifest URL is reachable:
```bash
curl https://registry.internsmarket.com/manifests/your-intern.json
```

### Validation Fails After Publishing

**Problem**: Published intern validates locally but fails on install

**Solution**: Ensure tarball contains all files:
```bash
tar -tzf your-intern-1.0.0.tar.gz | grep -E "manifest|aieos|SKILL"
# Should list all required files
```

### Version Mismatch

**Problem**: Manifest says v1.1.0 but CLI downloads v1.0.0

**Solution**: Update registry JSON `tarball_url` and `version` fields to match.

## Security Best Practices

1. **No credentials in bundles**: Never include `.env`, API keys, or secrets
2. **Use HTTPS only**: All registry and tarball URLs must be HTTPS
3. **Verify downloads** (future): Add SHA256 hash to manifest for integrity checking
4. **Sign releases** (future): GPG-sign tarballs for authenticity

### Pre-publish Checklist

Before uploading, ensure:
- [ ] No `.env` files in the tarball
- [ ] No hardcoded API keys in `aieos.json` or `SKILL.md`
- [ ] No auth tokens in config files
- [ ] All URLs are HTTPS
- [ ] Manifest is valid JSON (use `jq` or a JSON validator)
- [ ] Run final validation: `im validate ./your-intern`

## Advanced: Multiple Interns

To publish multiple interns:

```bash
# Create all tarballs
for intern in blog-writer data-analyst social-manager; do
  tar -czf ${intern}-1.0.0.tar.gz packages/interns/${intern}/
done

# Upload all to CDN
aws s3 sync . s3://internsmarket-bundles/bundles/ --exclude "*" --include "*.tar.gz"

# Update registry with all entries
# (registry.json contains all interns)
```

---

## Website Deployment (packages/website)

InternsMarket's Next.js landing page is deployed to Vercel with automatic preview and production environments.

### Prerequisites

- Node.js 20+
- Vercel account (free tier OK)
- GitHub repo connected to Vercel

### Build & Preview

```bash
# Install dependencies
cd packages/website
npm install

# Build static site
npm run build

# Preview locally
npm run dev  # Open http://localhost:3000
```

### Deploy to Vercel

**Option A: Git Push (Recommended)**

```bash
# Vercel auto-deploys on push to main
git add packages/website/src/
git commit -m "feat: update landing page"
git push origin main
# → Vercel builds and deploys automatically
# → Preview URL shown in GitHub PR
```

**Option B: Vercel CLI**

```bash
npm install -g vercel
vercel  # Deploy to preview
vercel --prod  # Deploy to production
```

### Environment Variables

None required for landing page (static site). If adding dynamic features, create `packages/website/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.internsmarket.com
```

### Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Analytics**: Real User Monitoring (Vercel Web Analytics)
- **Logs**: Vercel Deployments tab shows build/runtime errors

---

## Next Steps

- **Monitor**: Track download stats, user feedback
- **Iterate**: Release v1.1.0 with improvements based on usage
- **Scale**: Add more interns as community grows
- **Web Marketplace**: Phase 2 builds a web UI for discovery and payment
