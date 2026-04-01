---
name: flutter-styling
description: Micro-skill for Flutter design token usage, theme layering, and reusable UI component consistency.
---

# Flutter Styling

## When to use

Use for theming, color/typography/spacing tokens, and reusable component styling.

## Do

- Centralize visual primitives in a token system.
- Build reusable themed components before feature-level one-offs.
- Keep both Android and iOS platform behavior consistent with adaptive wrappers.

## Don't

- Do not hardcode visual constants in feature widgets.
- Do not mix incompatible style systems without explicit boundary.

## Minimal Correct Pattern

```
tokens -> app theme -> shared components -> feature screens
```
