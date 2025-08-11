#!/bin/sh

# Fail script on first error
set -e

TARGET_DIR="packages/create-servest"

echo "Checking for changes in $TARGET_DIR..."

if git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" "$VERCEL_GIT_COMMIT_SHA" -- "$TARGET_DIR"; then
  echo "✅ No changes detected in $TARGET_DIR — skipping build."
  exit 1  # Exit with non-zero status so Vercel cancels build
else
  echo "📦 Changes detected in $TARGET_DIR — proceeding with build."
fi
