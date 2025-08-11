#!/bin/bash

set -e

TARGET_DIR="packages/web-frontend"

# Ensure git history for diff
git fetch origin $VERCEL_GIT_COMMIT_REF --depth=2

echo "Checking for changes in $TARGET_DIR..."

# If there are changes in the target dir → build
if git diff --name-only HEAD^ HEAD | grep -q "^${TARGET_DIR}/"; then
  echo "📦 Changes detected in $TARGET_DIR — proceeding with build."
  exit 1 # Non-zero = build
else
  echo "✅ No changes detected in $TARGET_DIR — skipping build."
  exit 0 # Zero = skip
fi
