#!/bin/sh

# Use Vercel’s commit SHAs or fallback for local testing
PREV_SHA=${VERCEL_GIT_PREVIOUS_SHA:-HEAD~1}
CURR_SHA=${VERCEL_GIT_COMMIT_SHA:-HEAD}

echo "Comparing changes between $PREV_SHA and $CURR_SHA"

# Check if relevant folder changed
if git diff --quiet $PREV_SHA $CURR_SHA -- packages/web-frontend; then
  echo "No changes in packages/web-frontend, skipping build"
  exit 100  # special code to indicate skip
else
  echo "Changes detected in packages/web-frontend, running build"
  exit 0
fi
