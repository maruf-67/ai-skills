#!/bin/bash

# Next.js Feature Scaffolder
# Usage: ./scaffold-feature.sh <FeatureName>

FEATURE_NAME=$1
FEATURE_LOWER=$(echo "$FEATURE_NAME" | tr '[:upper:]' '[:lower:]')

if [ -z "$FEATURE_NAME" ]; then
    echo "Error: Please provide a feature name (e.g., Products)"
    exit 1
fi

TARGET_DIR="src/components/features/$FEATURE_LOWER"

if [ -d "$TARGET_DIR" ]; then
    echo "Error: Feature directory $TARGET_DIR already exists."
    exit 1
fi

mkdir -p "$TARGET_DIR"

# 1. Create index.ts
cat > "$TARGET_DIR/index.ts" << INDEX_EOF
export { ${FEATURE_NAME}List } from './${FEATURE_NAME}List';
export { ${FEATURE_NAME}Form } from './${FEATURE_NAME}Form';
export { use${FEATURE_NAME} } from './use${FEATURE_NAME}';
export type { ${FEATURE_NAME}, Create${FEATURE_NAME}Input } from './types';
INDEX_EOF

# 2. Create types.ts
cat > "$TARGET_DIR/types.ts" << TYPES_EOF
export interface ${FEATURE_NAME} {
  _id: string;
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Create${FEATURE_NAME}Input {
  name: string;
}
TYPES_EOF

# 3. Create hook
cat > "$TARGET_DIR/use${FEATURE_NAME}.ts" << HOOK_EOF
'use client';
import { useState, useCallback } from 'react';

export function use${FEATURE_NAME}() {
    const [items, setItems] = useState([]);
    return { items };
}
HOOK_EOF

# 4. Create List component
cat > "$TARGET_DIR/${FEATURE_NAME}List.tsx" << LIST_EOF
'use client';
import { DataTable } from '@/components/ui';

export function ${FEATURE_NAME}List() {
    return (
        <div>
            <h1 className="text-2xl font-bold">${FEATURE_NAME}</h1>
            {/* Implement list logic */}
        </div>
    );
}
LIST_EOF

echo "Feature $FEATURE_NAME scaffolded successfully in $TARGET_DIR"
