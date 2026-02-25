# Infrastructure Runbook: [System Name]

> Marcus reads this before designing pipelines or alerting for your system.
> Fill in each section. The more complete this is, the better his output.

---

## System Overview

**System name:**
**Purpose:**
**Owner / team:**
**Criticality:** [ ] P1 (revenue-critical) [ ] P2 (internal) [ ] P3 (non-critical)

---

## Architecture

**Components:**
_List each service, database, cache, queue, CDN, etc._

| Component | Type | Cloud service / host | Criticality |
|-----------|------|----------------------|-------------|
| | | | |

**Dependencies:**
_External APIs, third-party services, shared infrastructure._

---

## Deployment Process

**Current deploy method:**
_e.g. "Push to main → GitHub Actions → ECS rolling deploy"_

**Deploy frequency:**
**Deployment window:**
_e.g. "Weekdays 10am–4pm only" or "Anytime (blue-green)"_

**Rollback procedure:**
_Step-by-step. Be specific._

1.
2.
3.

---

## Monitoring & Alerting

**Primary monitoring tool:**
**Dashboard URL:**
**Key metrics tracked:**

| Metric | Normal range | Alert threshold | Severity |
|--------|-------------|-----------------|----------|
| | | | |

**On-call contact:**
**Escalation path:**

---

## Common Issues

| Symptom | Likely cause | Remediation steps |
|---------|-------------|-------------------|
| | | |

---

## Access & Credentials

**Where secrets are stored:**
**Who has prod access:**
**Access request process:**

---

_Last updated: [date] by [name]_
