#!/bin/sh

if git diff --quiet $VERCEL_GIT_PREVIOUS_SHA $VERCEL_GIT_COMMIT_SHA -- packages/create-servest; then
  echo "No changes in packages/create-servest, skipping build"
  exit 0
else
  echo "Changes detected in packages/create-servest, proceeding with build"
fi
