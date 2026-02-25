# Data Dictionary: [Dataset / Database Name]

> Priya reads this before writing queries or designing dashboards for your data.
> Fill in each table and its key fields. Update when schema changes.

---

## Database / Schema Overview

**System name:**
**Purpose:**
**Primary owner / team:**
**Last updated:**

---

## Tables

### `[table_name]`

**Purpose:** What this table represents (one sentence).
**Grain:** One row = one [entity/event].
**Row count (approx):**
**Update frequency:**

| Column | Type | Description | Example value | Nullable? |
|--------|------|-------------|---------------|-----------|
| id | UUID | Primary key | `a3f8c2d1-...` | No |
| | | | | |

**Known issues / quirks:**
_e.g. "created_at is in UTC but displayed as EST in the app"_

**Common joins:**
_e.g. "JOIN users ON user_id = users.id"_

---

_(Repeat for each table)_

---

## Key Business Definitions

| Term | Definition | Formula / source |
|------|------------|-----------------|
| Active user | User who performed any action in the last 30 days | `events.created_at > NOW() - INTERVAL '30 days'` |
| | | |

---

_Last updated: [date] by [name]_
