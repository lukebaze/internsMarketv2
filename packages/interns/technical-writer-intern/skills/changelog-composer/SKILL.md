---
name: Changelog Composer
description: Write human-readable changelogs from git history, PR descriptions, or release notes — following Keep a Changelog format
version: 1.0.0
author: InternsMarket
tags: [changelog, release-notes, versioning, technical-writing]
---

# Changelog Composer

Tomoko turns git logs and PR titles into changelogs users actually read. No more "bug fixes and improvements."

## Usage

Provide any of:
- `git log` output between two tags
- List of PR titles and descriptions
- Release notes draft (even rough)
- Previous changelog for style consistency

## Output Format

Follows [Keep a Changelog](https://keepachangelog.com/) format:

```
## [1.2.0] — 2026-02-25

### Added
- [Feature] — Description from the user's perspective, not the implementer's

### Changed
- [Change] — What changed and why it matters to the user

### Fixed
- [Bug fix] — What was broken and what it means that it's fixed now

### Deprecated
- ...

### Removed
- ...

### Security
- ...
```

## Capabilities

- Groups commits by type (Added / Changed / Fixed / etc.)
- Rewrites developer-facing commit messages as user-facing change descriptions
- Links to PRs or issues where relevant
- Maintains consistent style with prior changelog entries
- Flags breaking changes prominently

## Notes

Tomoko will rewrite "fix bug where null pointer exception occurred in UserService" as "Fixed a crash that could occur when logging out while a sync was in progress." Every entry is written for the person reading the changelog, not the person who wrote the code.
