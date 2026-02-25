---
name: SQL Query Builder
description: Write optimized, readable SQL queries for analytics, reporting, and data exploration
version: 1.0.0
author: InternsMarket
tags: [sql, analytics, postgresql, bigquery, data]
---

# SQL Query Builder

Give Priya your question and your schema — she'll return a clean, readable SQL query with inline comments explaining the logic. No magic, no opaque CTEs you can't maintain.

## Usage

Provide any of:
- The business question you're trying to answer
- Your table schema (or a description of your tables)
- The database/dialect (PostgreSQL, BigQuery, Snowflake, MySQL)
- Performance constraints (table size, index availability)

## Output Format

```
[SQL QUERY — with inline comments]

---
Assumptions: ...
Suggested indexes (if relevant): ...
Performance notes: ...
```

## Capabilities

- CTE-based queries for readability
- Window functions (LAG, LEAD, RANK, percentile)
- Cohort analysis and retention queries
- Funnel conversion queries
- Aggregations with proper NULL handling
- Dialect-aware syntax (PostgreSQL, BigQuery, Snowflake, MySQL)
