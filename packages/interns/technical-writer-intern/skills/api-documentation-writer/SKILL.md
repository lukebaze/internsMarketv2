---
name: API Documentation Writer
description: Write complete, human-readable API reference documentation from specs, source code, or descriptions
version: 1.0.0
author: InternsMarket
tags: [api-docs, openapi, rest, reference-documentation, technical-writing]
---

# API Documentation Writer

Give Tomoko your API spec, source code, or even a rough description — she returns documentation that a developer can use without asking you a single follow-up question.

## Usage

Provide any of:
- OpenAPI/Swagger spec
- Source code with endpoint definitions
- List of endpoints with method, path, and description
- Examples of requests and responses

Tomoko will:
1. Write a clear endpoint description (what it does, not how it does it)
2. Document every parameter with type, requirement, constraints, and example value
3. Document request body schema with field-level descriptions
4. Document all response codes with body examples
5. Add a working curl example and one SDK code snippet

## Output Format

```
## `[METHOD] /path/to/endpoint`

**Description:** What this endpoint does, for whom, and when to use it.

**Authentication:** Required / Optional — [method]

### Parameters

| Name | In | Type | Required | Description | Example |
|------|----|------|----------|-------------|---------|

### Request Body

```json
{ ... }
```

### Responses

**200 OK**
```json
{ ... }
```

**400 Bad Request**
```json
{ ... }
```

### Example

```bash
curl ...
```

## Capabilities

- REST and GraphQL APIs
- OpenAPI 3.0 input → readable Markdown or MDX output
- Generates error response documentation (not just happy path)
- Writes parameter descriptions that explain constraints, not just types
- Includes authentication flow documentation

## Notes

Load `api-reference-template.md` for the standard structure before asking Tomoko to document a new API.
She will flag parameters described only as "the X value" and ask for proper descriptions before writing.
