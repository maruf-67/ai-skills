#!/bin/bash

# Exit on error
set -e

TASK_TITLE="$1"
TASK_TYPE="${2:-feature}" # Default to feature if not provided

if [ -z "$TASK_TITLE" ]; then
    echo "Error: Task title is required."
    echo "Usage: $0 \"Task Title\" [type]"
    echo "Types: feature (default), fix, ai, design, hotfix"
    exit 1
fi

# Step 1: Verify Git State
echo "🔍 Verifying Git state..."

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: Not a git repository."
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --short)" ]; then
    echo "STATUS: REPO_DIRTY"
    echo "❌ Error: Repository has uncommitted changes."
    echo "Please commit, stash, or ask the agent to handle them."
    # Exit with code 2 to signal "dirty repo" to the agent
    exit 2
fi

# Step 2: Detect Production Branch (main or master)
if git show-ref --verify --quiet refs/heads/main; then
    PROD_BRANCH="main"
elif git show-ref --verify --quiet refs/heads/master; then
    PROD_BRANCH="master"
else
    # Fallback to origin HEAD detection
    PROD_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')
fi

# Step 3: Checkout and Sync 'dev' (Integration Branch)
echo "📥 Syncing integration branch: dev..."
if ! git show-ref --verify --quiet refs/heads/dev; then
    echo "⚠️ dev branch not found locally. Attempting to track from origin..."
    if git ls-remote --exit-code --heads origin dev > /dev/null 2>&1; then
        git checkout -b dev --track origin/dev
    else
        echo "⚠️ dev branch not found on origin. Creating local dev from $PROD_BRANCH..."
        git checkout "$PROD_BRANCH"
        git checkout -b dev
    fi
else
    git checkout dev
fi

# Only pull if dev exists on origin
if git ls-remote --exit-code --heads origin dev > /dev/null 2>&1; then
    git pull origin dev
else
    echo "ℹ️ dev branch does not exist on origin yet. Skipping pull."
fi

# Step 4: Sync master/main into dev (Maintain hierarchy: Prod -> Dev)
echo "📥 Checking for updates from $PROD_BRANCH..."
git fetch origin "$PROD_BRANCH"

# Check if dev is behind production branch
BEHIND_COUNT=$(git rev-list --count dev..origin/"$PROD_BRANCH")

if [ "$BEHIND_COUNT" -gt 0 ]; then
    echo "🔄 dev is behind $PROD_BRANCH by $BEHIND_COUNT commits. Merging..."
    git merge origin/"$PROD_BRANCH" --no-edit
    echo "✅ dev is now synchronized with $PROD_BRANCH."
else
    echo "✨ dev is already in sync with $PROD_BRANCH."
fi

# Step 5: Determine Branch Type and Generate Name
PREFIX=""
case "$TASK_TYPE" in
    feature) PREFIX="feature/" ;;
    fix)     PREFIX="fix/" ;;
    ai)      PREFIX="ai/" ;;
    design)  PREFIX="design/" ;;
    hotfix)  PREFIX="hotfix/" ;;
    *)       PREFIX="feature/" ;; # Fallback
esac

# Clean the title for branch naming
CLEAN_TITLE=$(echo "$TASK_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

# Naming Convention: prefix/slug-TID-date
DATE=$(date +%Y-%m-%d)
FULL_BRANCH_NAME="${PREFIX}${CLEAN_TITLE}"

# Append date if not already present in the title
if [[ ! "$FULL_BRANCH_NAME" =~ [0-9]{4}-[0-9]{2}-[0-9]{2} ]]; then
    FULL_BRANCH_NAME="${FULL_BRANCH_NAME}-${DATE}"
fi

echo "🌿 Generated branch name: $FULL_BRANCH_NAME"

# Step 6: Create and Switch Branch
if git show-ref --verify --quiet "refs/heads/$FULL_BRANCH_NAME"; then
    echo "⚠️ Warning: Branch $FULL_BRANCH_NAME already exists. Switching to it."
    git checkout "$FULL_BRANCH_NAME"
else
    echo "🚀 Creating and switching to branch $FULL_BRANCH_NAME..."
    git checkout -b "$FULL_BRANCH_NAME"
fi

# Final check
if [ "$(git branch --show-current)" == "dev" ] || [ "$(git branch --show-current)" == "$PROD_BRANCH" ]; then
    echo "❌ Error: Failed to switch to task branch."
    exit 1
fi

# Step 7: Initialize Task Workspace
PROJECT_ROOT=$(git rev-parse --show-toplevel)
TASK_DIR_NAME=$(echo "$FULL_BRANCH_NAME" | sed 's@/@-@g')
TASK_CONTEXT_DIR="$PROJECT_ROOT/.ai/tasks/$TASK_DIR_NAME"

echo "📁 Initializing task workspace in $TASK_CONTEXT_DIR..."
mkdir -p "$TASK_CONTEXT_DIR"

# Capitalize TASK_TYPE for display (compatible with all Bash versions)
CAP_TASK_TYPE=$(echo "$TASK_TYPE" | awk '{print toupper(substr($0,1,1))tolower(substr($0,2))}')

# task.md Template with Step 7 PR Checklist
cat <<EOF > "$TASK_CONTEXT_DIR/task.md"
# Task
## Title
$TASK_TITLE
## Branch
$FULL_BRANCH_NAME
## Type
$CAP_TASK_TYPE
## PR Target
dev

## Goal
Short objective.

## Scope
- Item 1
- Item 2

## Testing
- [ ] Unit test
- [ ] Manual verification
- [ ] Edge case checked

## PR Checklist (Step 7)
- [ ] Code reviewed by self
- [ ] Tests written / updated
- [ ] No console errors
- [ ] Acceptance criteria met

## Notes
Task initialized using \`/ai-os:task-init\`
EOF

# Create supporting files if they don't exist
touch "$TASK_CONTEXT_DIR/checklist.md"
touch "$TASK_CONTEXT_DIR/notes.md"
touch "$TASK_CONTEXT_DIR/references.md"

echo "✅ Task initialization complete!"
echo "Current branch: $(git branch --show-current)"
echo "Task workspace: .ai/tasks/$TASK_DIR_NAME/"
echo "PR Target: dev"
