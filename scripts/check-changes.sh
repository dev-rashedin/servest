#!/bin/bash
set -e

# List files changed in the last commit
CHANGED_FILES=$(git diff --name-only HEAD^ HEAD)

# Check if any of the changed files are in packages/web-frontend
if echo "$CHANGED_FILES" | grep -q "^packages/web-frontend/"; then
  echo "✅ Changes detected in web-frontend — building."
  exit 1  # 1 tells Vercel: run the build
else
  echo "🚫 No changes in web-frontend — skipping build."
  exit 0  # 0 tells Vercel: skip the build
fi
