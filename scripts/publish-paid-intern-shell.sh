#!/usr/bin/env bash
# Usage: ./scripts/publish-paid-intern-shell.sh data-analyst-intern
# Only publishes manifest.json + README.md (files field in package.json enforces this)
set -euo pipefail

INTERN_ID="${1:?Usage: $0 <intern-id>}"
INTERN_DIR="packages/interns/${INTERN_ID}"

if [ ! -f "${INTERN_DIR}/package.json" ]; then
  echo "Error: ${INTERN_DIR}/package.json not found"
  exit 1
fi

if [ ! -f "${INTERN_DIR}/README.md" ]; then
  echo "Error: ${INTERN_DIR}/README.md not found (shell packages require README)"
  exit 1
fi

echo "Publishing @internsmarket/${INTERN_ID} (shell package — manifest + README only)..."
cd "${INTERN_DIR}"
# Dry-run first to confirm only manifest.json and README.md are included
npm publish --dry-run 2>&1 | grep "npm notice" | head -20
echo ""
read -p "Confirm publish? (y/N) " confirm
if [ "${confirm}" != "y" ]; then echo "Aborted."; exit 0; fi

npm publish --access public
echo "Done."
