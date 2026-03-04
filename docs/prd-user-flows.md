# InternsMarket — PRD User Flows & Journeys

## 1. Product Architecture Overview

```mermaid
flowchart TB
  subgraph Users["Target Users"]
    Solo["Solopreneurs"]
    Dev["Developers"]
    Creator["Content Creators"]
    Ent["Enterprises"]
  end

  subgraph Product["InternsMarket Platform"]
    Website["Landing Page<br/>(Next.js + Vercel)"]
    CLI["CLI Tool<br/>(im command)"]
    Core["Core Library<br/>(AIEOS v1.1)"]
    Interns["11 AI Intern Packages"]
  end

  subgraph Services["External Services"]
    Polar["Polar.sh<br/>(Licensing & Payment)"]
    GH["GitHub Releases<br/>(Package Distribution)"]
    NPM["npm Registry<br/>(Free Packages)"]
    Runtime["ZeroClaw / OpenClaw<br/>(AI Runtimes)"]
  end

  Users --> Website
  Users --> CLI
  CLI --> Core
  CLI --> Polar
  CLI --> GH
  CLI --> NPM
  CLI --> Runtime
  Core --> Interns
  Website --> Polar
```

---

## 2. User Discovery & Purchase Flow

```mermaid
flowchart TD
  A["Visit internsmarket.com"] --> B{"Browse Intern Catalog"}
  B --> C["View Intern Profiles<br/>(Skills, Personality, Tags)"]
  C --> D{"Choose Tier"}

  D -->|Free| E["Click INSTALL FREE"]
  D -->|Starter $9| F["Click UPGRADE"]
  D -->|Pro $19| G["Click UPGRADE"]
  D -->|Enterprise| H["Click CONTACT US"]

  E --> I["Copy: npm install -g internsmarket"]
  F --> J["Polar.sh Checkout<br/>(One-time payment)"]
  G --> J
  H --> K["Contact Form / Email"]

  J --> L["Receive License Key"]
  L --> M["Run: im activate"]
  M --> N["Paste License Key"]
  N --> O{"Polar.sh Validates"}
  O -->|Valid| P["Tier Unlocked<br/>(Cached 24h)"]
  O -->|Invalid| Q["Error: Invalid Key<br/>Show Upgrade Link"]

  I --> R["Run: im install <intern>"]
  P --> R

  R --> S{"Tier Check"}
  S -->|Allowed| T["Download & Install Intern"]
  S -->|Blocked| U["Upgrade Required<br/>Show Pricing Link"]

  T --> V["Run: im apply <intern>"]
  V --> W["Intern Active in Runtime"]

  style A fill:#F59E0B,color:#000
  style W fill:#84CC6A,color:#000
  style Q fill:#E87461,color:#fff
  style U fill:#E87461,color:#fff
```

---

## 3. CLI Install Flow (Technical)

```mermaid
flowchart TD
  Start["im install <intern-id>"] --> Validate["Validate Intern ID<br/>(a-z, 0-9, hyphens only)"]
  Validate -->|Invalid| Err1["Error: Invalid ID format"]
  Validate -->|Valid| CheckInstalled{"Already Installed?"}

  CheckInstalled -->|Yes & no --force| Err2["Error: Already installed.<br/>Use --force to reinstall"]
  CheckInstalled -->|No or --force| CheckLocal{"--local-path<br/>provided?"}

  CheckLocal -->|Yes| LocalInstall["Dev Mode:<br/>Copy from local dir"]
  CheckLocal -->|No| CheckNpm{"npm package<br/>available?"}

  CheckNpm -->|Full package| NpmInstall["Install from<br/>npm package"]
  CheckNpm -->|Shell or none| Registry["Registry Mode"]

  Registry --> License["Check License<br/>(Polar.sh API)"]
  License --> Fetch["Fetch Registry<br/>(GitHub Releases manifest)"]
  Fetch --> TierCheck{"Tier Sufficient?"}
  TierCheck -->|No| Err3["Error: Upgrade Required"]
  TierCheck -->|Yes| Download["Download Bundle<br/>(URL validated)"]

  Download --> Verify["Verify Ed25519 Signature"]
  Verify -->|Invalid| Err4["Error: Signature Failed<br/>Package may be tampered"]
  Verify -->|Valid| Extract["Extract .tar.gz"]

  Extract --> ValidatePkg["Validate Package<br/>(manifest + aieos)"]
  ValidatePkg -->|Invalid| Err5["Error: Bundle Validation Failed"]
  ValidatePkg -->|Valid| Install["Move to install path"]

  Install --> Watermark["Inject Watermark<br/>(activationId + cliVersion)"]
  Watermark --> GenConfig["Generate Runtime Config<br/>(ZeroClaw/OpenClaw)"]
  GenConfig --> Register["Register in local store"]
  Register --> Done["Install Complete"]

  LocalInstall --> Watermark
  NpmInstall --> Watermark

  style Start fill:#F59E0B,color:#000
  style Done fill:#84CC6A,color:#000
  style Err1 fill:#E87461,color:#fff
  style Err2 fill:#E87461,color:#fff
  style Err3 fill:#E87461,color:#fff
  style Err4 fill:#E87461,color:#fff
  style Err5 fill:#E87461,color:#fff
```

---

## 4. License Validation Flow

```mermaid
flowchart TD
  Start["checkLicense()"] --> HasKey{"License Key<br/>in config?"}
  HasKey -->|No| Free1["Return: free"]

  HasKey -->|Yes| CacheCheck{"Cache Fresh?<br/>(validUntil > now)"}
  CacheCheck -->|Yes| CachedTier["Return: cached tier"]

  CacheCheck -->|No| OrgCheck{"POLAR_ORG_ID<br/>configured?"}
  OrgCheck -->|Placeholder| Free2["Return: free"]

  OrgCheck -->|Real ID| CallPolar["POST Polar.sh<br/>/validate"]
  CallPolar -->|200 OK| CheckStatus{"status == active?"}
  CallPolar -->|Non-200| Free3["Reset to free"]
  CallPolar -->|Network Error| Grace{"Grace Uses > 0?"}

  CheckStatus -->|Active| MapTier["Map benefits → tier"]
  CheckStatus -->|Inactive/Expired| Free4["Reset to free"]

  MapTier --> UpdateCache["Cache tier + TTL<br/>Reset grace uses"]
  UpdateCache --> ReturnTier["Return: resolved tier"]

  Grace -->|Yes| Decrement["Decrement grace<br/>Return cached tier"]
  Grace -->|No| Free5["Reset to free"]

  style Start fill:#F59E0B,color:#000
  style ReturnTier fill:#84CC6A,color:#000
  style Free1 fill:#9C8B7A,color:#fff
  style Free2 fill:#9C8B7A,color:#fff
  style Free3 fill:#E87461,color:#fff
  style Free4 fill:#E87461,color:#fff
  style Free5 fill:#E87461,color:#fff
```

---

## 5. User Journey Map

```mermaid
journey
  title InternsMarket User Journey
  section Discovery
    See landing page or GitHub: 3: User
    Browse intern catalog: 4: User
    Read feature highlights: 4: User
    Check pricing tiers: 3: User
  section First Install
    Copy npm install command: 5: User
    Run im install intern: 4: User
    First intern working: 5: User
  section Evaluation
    Test intern on real tasks: 4: User
    Hit free tier limit: 2: User
    Compare Starter vs Pro: 3: User
  section Purchase
    Click upgrade on website: 4: User
    Complete Polar.sh checkout: 4: User
    Activate license key: 5: User
    Install paid interns: 5: User
  section Daily Usage
    Deploy interns to projects: 5: User
    Switch between interns: 4: User
    Update to latest versions: 4: User
  section Advocacy
    Share with team: 5: User
    Recommend on social: 4: User
    Request new interns: 3: User
```

---

## 6. Security Verification Flow

```mermaid
sequenceDiagram
  participant User
  participant CLI
  participant Polar as Polar.sh API
  participant GH as GitHub Releases
  participant FS as Local Filesystem

  User->>CLI: im install content-marketing-intern
  CLI->>CLI: validateInternId (regex check)

  CLI->>Polar: POST /validate (license key)
  Polar-->>CLI: {status: active, tier: starter}
  CLI->>CLI: Cache tier (24h TTL)

  CLI->>GH: GET manifest.json (5-min cache)
  GH-->>CLI: Registry index (all interns)
  CLI->>CLI: Check tier >= tier_required

  CLI->>CLI: Validate download URL prefix
  CLI->>GH: GET bundle.tar.gz
  GH-->>CLI: Tarball bytes

  CLI->>CLI: SHA256 hash tarball
  CLI->>CLI: Verify Ed25519 signature
  Note over CLI: integrity = "id@version:sha256"<br/>Check against TRUSTED_PUBLIC_KEYS

  CLI->>CLI: Extract tarball (skip symlinks)
  CLI->>CLI: Validate package structure

  CLI->>FS: Move to install path
  CLI->>FS: Inject watermark (activationId)
  CLI->>FS: Generate runtime config
  CLI->>FS: Register in local store

  CLI-->>User: Intern installed successfully
```

---

## 7. Pricing Tier State Machine

```mermaid
stateDiagram-v2
  [*] --> Free: npm install

  Free --> ActivatingStarter: im activate (Starter key)
  Free --> ActivatingPro: im activate (Pro key)

  ActivatingStarter --> Starter: Polar.sh validates
  ActivatingPro --> Pro: Polar.sh validates

  ActivatingStarter --> Free: Validation failed
  ActivatingPro --> Free: Validation failed

  Starter --> Pro: Upgrade (new key)
  Pro --> Starter: Downgrade (new key)

  Starter --> GracePeriod: Network failure
  Pro --> GracePeriod: Network failure

  GracePeriod --> Starter: Network restored (within 3 uses)
  GracePeriod --> Pro: Network restored (within 3 uses)
  GracePeriod --> Free: Grace uses exhausted

  state Free {
    [*] --> Limited
    Limited: 1 intern max
    Limited: Community support
  }

  state Starter {
    [*] --> Standard
    Standard: Up to 5 interns
    Standard: Email support
  }

  state Pro {
    [*] --> Unlimited
    Unlimited: Unlimited interns
    Unlimited: Priority support
  }
```

---

## 8. Product Roadmap Timeline

```mermaid
gantt
  title InternsMarket Development Roadmap
  dateFormat YYYY-MM
  axisFormat %b %Y

  section v1.0 Core
    Core library & CLI        :done, core, 2026-01, 2026-02
    11 AI intern personas     :done, interns, 2026-01, 2026-02

  section v1.1 Security & Landing
    Polar.sh licensing        :done, polar, 2026-02, 2026-02
    Ed25519 package signing   :done, signing, 2026-02, 2026-02
    GitHub Releases dist      :done, releases, 2026-02, 2026-02
    Landing page              :done, landing, 2026-02, 2026-02
    Security hardening        :done, harden, 2026-02, 2026-02
    Vercel CI/CD              :done, cicd, 2026-02, 2026-02

  section v1.2 Marketplace
    User accounts & auth      :active, auth, 2026-03, 2026-04
    Web marketplace UI        :market, 2026-03, 2026-05
    Community submissions     :community, 2026-04, 2026-06
    Usage analytics           :analytics, 2026-05, 2026-06

  section v1.3+ Future
    Intern customization      :custom, 2026-06, 2026-08
    Webhook integrations      :webhooks, 2026-07, 2026-09
    Mobile exploration        :mobile, 2026-09, 2026-12
    Enterprise features       :enterprise, 2026-09, 2026-12
```
