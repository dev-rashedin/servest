#!/bin/bash
set -e

# List files changed in the last commit
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD)

# Check if any of the changed files are in packages/web-frontend
if echo "$CHANGED_FILES" | grep -q "^app/"; then
  echo "✅ Changes detected — building."
  exit 0
else
  echo "🚫 No changes — skipping build."
  exit 78
fi
