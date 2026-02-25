# API Reference: [API Name]

> Tomoko uses this as the structural skeleton for API documentation.
> Fill in the overview sections; she'll complete the endpoint docs.

---

## Overview

**API name:**
**Base URL:** `https://api.example.com/v1`
**Version:**
**Protocol:** REST / GraphQL / gRPC

**What this API does:**
_One paragraph. What problems does it solve? Who uses it?_

---

## Authentication

**Method:** Bearer token / API key / OAuth 2.0 / Basic auth

**How to authenticate:**
```
Authorization: Bearer {your_token}
```

**How to get credentials:**
_Link to or describe the process._

**Token expiry:**
**Rate limits:**

---

## Base URL & Versioning

```
https://api.example.com/v1
```

**Versioning strategy:**
_e.g. "Version is in the URL path. Breaking changes increment the major version."_

---

## Request & Response Format

**Content-Type:** `application/json`
**Date format:** ISO 8601 (`2026-02-25T00:00:00Z`)
**IDs:** UUID v4 / integer / string

**Standard error response:**
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested resource does not exist.",
    "details": {}
  }
}
```

---

## Error Codes

| HTTP status | Code | Meaning |
|-------------|------|---------|
| 400 | `INVALID_REQUEST` | Request body or parameters failed validation |
| 401 | `UNAUTHORIZED` | Missing or invalid authentication |
| 403 | `FORBIDDEN` | Authenticated but lacks permission |
| 404 | `RESOURCE_NOT_FOUND` | Resource does not exist |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Server error — retry with backoff |

---

## Endpoints

_(Tomoko will complete each endpoint section using the API Documentation Writer skill)_

---

## SDKs & Client Libraries

| Language | Package | Install |
|----------|---------|---------|
| | | |

---

## Changelog

_Link to or embed the API changelog here._

---

_Last updated: [date] | Version: [API version]_
