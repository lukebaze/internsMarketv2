#!/usr/bin/env bash
# Usage: ./scripts/publish-free-intern.sh content-marketing-intern
set -euo pipefail

INTERN_ID="${1:?Usage: $0 <intern-id>}"
INTERN_DIR="packages/interns/${INTERN_ID}"

if [ ! -f "${INTERN_DIR}/package.json" ]; then
  echo "Error: ${INTERN_DIR}/package.json not found"
  exit 1
fi

echo "Publishing @internsmarket/${INTERN_ID} (full package)..."
cd "${INTERN_DIR}"
npm publish --access public
echo "Done."
