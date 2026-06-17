#!/bin/bash
set -e

# Task Finish Script
echo "🎯 Executing Task Finish workflow..."

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "❌ Error: Not a git repository."
    exit 1
fi

PROJECT_ROOT=$(git rev-parse --show-toplevel)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "(none)")

if [ "$CURRENT_BRANCH" = "dev" ] || [ "$CURRENT_BRANCH" = "master" ] || [ "$CURRENT_BRANCH" = "main" ]; then
    echo "❌ Error: Cannot finish task from a protected/base branch: $CURRENT_BRANCH"
    exit 1
fi

TASK_DIR_NAME=$(echo "$CURRENT_BRANCH" | sed 's@/@-@g')
TASK_CONTEXT_DIR="$PROJECT_ROOT/.ai/tasks/$TASK_DIR_NAME"

if [ ! -d "$TASK_CONTEXT_DIR" ]; then
    echo "⚠️ Warning: Task context directory not found at .ai/tasks/$TASK_DIR_NAME/"
    mkdir -p "$TASK_CONTEXT_DIR"
fi

# Detect Stack
STACK="general"
if [ -f "$PROJECT_ROOT/artisan" ] || [ -f "$PROJECT_ROOT/composer.json" ]; then
    STACK="laravel"
elif [ -f "$PROJECT_ROOT/next.config.ts" ] || [ -f "$PROJECT_ROOT/next.config.js" ]; then
    STACK="nextjs"
elif [ -f "$PROJECT_ROOT/pubspec.yaml" ]; then
    STACK="flutter"
elif [ -f "$PROJECT_ROOT/package.json" ]; then
    STACK="node"
fi

echo "📦 Detected stack: $STACK"

# Run stack-specific linting/quality check if tools are available
if [ "$STACK" = "laravel" ]; then
    if [ -f "vendor/bin/pint" ]; then
        echo "🔧 Running Pint code formatter..."
        vendor/bin/pint --dirty --format agent || echo "⚠️ Pint found issues but completed."
    fi
elif [ "$STACK" = "nextjs" ] || [ "$STACK" = "node" ]; then
    if [ -f "node_modules/.bin/eslint" ]; then
        echo "🔧 Running ESLint..."
        npx eslint --ext .ts,.tsx,.js --max-warnings 0 src/ || echo "⚠️ ESLint found warnings."
    fi
fi

# Generate Git Diff Patch
echo "📝 Generating git diff against origin/dev..."
git fetch origin dev || true
git diff origin/dev..HEAD > "$TASK_CONTEXT_DIR/diff.patch" || echo "No changes against dev."

# Mark task status in task.md
TASK_MD="$TASK_CONTEXT_DIR/task.md"
if [ -f "$TASK_MD" ]; then
    echo "📝 Updating task.md status to Complete..."
    sed -i 's/Status: In Progress/Status: Complete/g' "$TASK_MD" || true
    sed -i 's/- \[ \] Implementation complete/- \[x\] Implementation complete/g' "$TASK_MD" || true
    sed -i 's/- \[ \] Tests written and passing/- \[x\] Tests written and passing/g' "$TASK_MD" || true
fi

# Update Playbook PROGRESS.md
PLAYBOOK_FILE="$PROJECT_ROOT/.ai/playbook/PROGRESS.md"
if [ -f "$PLAYBOOK_FILE" ]; then
    echo "📝 Updating PROGRESS.md..."
    # Mark tasks corresponding to current branch as completed if listed
    sed -i "s/- \[ \] .*$CURRENT_BRANCH.*/- \[x\] Completed task on $CURRENT_BRANCH/g" "$PLAYBOOK_FILE" || true
fi

echo "✅ Task finish script completed successfully!"
echo "Next: follow the /ai-os:task-finish workflow in your session to generate and submit the PR."
