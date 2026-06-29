---
name: consistency-check
version: 1.0.0
description: Audit a codebase for naming, namespace, and structural consistency. Produces
  a Consistent / Inconsistent report with a recommended standard. Triggers on /ai-os:arch-consistency-check.
type: Skill
title: consistency-check
resource: file:///home/almaruf67/Codes/ai-skills/skills/core/arch/consistency-check/SKILL.md
tags:
- core
- arch
- consistency-check
timestamp: '2026-06-29T19:13:46Z'
---

# Architecture Agent: Consistency Check

Audits a codebase — or a subset of it — across three check groups and produces a structured report. Runs in three modes depending on what the user provides.

```
Input → [Collect] → [Check A: File & Folder Naming]
                  → [Check B: Class / Interface / Enum Naming]
                  → [Check C: Namespace Alignment]
                  → [Report] → Consistent ✅ / Inconsistent ❌
                             → Standards Reference (adoptable)
```

## Mandates

- **No False Positives**: If a pattern is ambiguous or a valid exception, mark it `WARN`, not `FAIL`.
- **Show Both Found and Expected**: Never just say "wrong" — always display what was found and what was expected.
- **Stack-Aware**: Detect Laravel, Nuxt, or Multi-Repo stack and apply the correct conventions.
- **Actionable Output**: Every violation must map to a clear, fixable recommendation.

## Operating Modes

| Mode | Trigger | Source |
|---|---|---|
| **Live** | User is inside a project | Run `find` / `grep` commands |
| **Paste** | User pastes a directory tree or file list | Parse the pasted content |
| **File** | User uploads files or a manifest | Read and analyze |

Detect the mode from context. If unclear, ask the user whether to scan the working directory or accept a pasted file list.

## Pre-Flight — Detect Stack

```bash
# Laravel detection
ls artisan composer.json 2>/dev/null

# Nuxt/Vue detection
ls nuxt.config.ts nuxt.config.js package.json 2>/dev/null && grep -q "nuxt" package.json 2>/dev/null

# Both present → Multi-Repo layout (backend/ + frontend/)
ls backend/ frontend/ 2>/dev/null
```

Stack determines which convention table is used.

## Collect Phase

### Live Mode — gather file lists

```bash
# All PHP files (Laravel)
find . -name "*.php" \
  -not -path "*/vendor/*" \
  -not -path "*/storage/*" \
  -not -path "*/bootstrap/cache/*" \
  | sort

# All Vue/TS files (Nuxt)
find . \( -name "*.vue" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.nuxt/*" \
  -not -path "*/dist/*" \
  | sort

# Directory tree (both stacks)
find . -type d \
  -not -path "*/vendor/*" \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  | sort
```

### Namespace extraction (Laravel)

```bash
grep -rn "^namespace " --include="*.php" . \
  | grep -v vendor \
  | awk -F: '{print $1, $3}' \
  | sort
```

## Check A — File & Folder Naming

**Standard by stack:**

| Stack | Folders | PHP Files | Vue/TS Files | Config / Script Files |
|---|---|---|---|---|
| Laravel | `kebab-case` or `PascalCase` (app/) | `PascalCase.php` | — | `kebab-case` |
| Nuxt/Vue | `kebab-case` | — | `PascalCase.vue` (components) / `kebab-case.vue` (pages, layouts) | `kebab-case` |

**Process:**

1. For each file/folder, extract the base name.
2. Classify: PascalCase / camelCase / kebab-case / snake_case / SCREAMING_SNAKE / mixed.
3. Compare against the expected convention for that path context.
4. Record: `PASS` if matches, `FAIL` if not, `WARN` if ambiguous.

**Contexts to check:**

```
Laravel:
  app/Http/Controllers/     → PascalCase + "Controller" suffix
  app/Http/Requests/        → PascalCase + "Request" suffix
  app/Http/Resources/       → PascalCase + "Resource" suffix
  app/Models/               → PascalCase, singular noun
  app/Services/             → PascalCase + "Service" suffix
  app/Repositories/         → PascalCase + "Repository" suffix
  app/DTOs/                 → PascalCase + "DTO" suffix
  app/Enums/                → PascalCase
  database/migrations/      → snake_case timestamp prefix
  routes/                   → kebab-case .php

Nuxt:
  components/               → PascalCase.vue (auto-import name = filename)
  pages/                    → kebab-case.vue or [param].vue
  layouts/                  → kebab-case.vue
  composables/              → camelCase, must start with "use"
  stores/                   → camelCase, must start with "use"
  middleware/               → kebab-case.ts
  plugins/                  → kebab-case.ts
  server/api/               → kebab-case.ts
```

## Check B — Class / Interface / Enum Naming

**Standard:**

| Artifact | Rule | Example |
|---|---|---|
| Class | PascalCase, noun or noun-phrase | `UserService`, `InvoiceResource` |
| Interface | PascalCase + `Interface` suffix or I-prefix (pick one, be consistent) | `PaymentGatewayInterface` |
| Enum | PascalCase, noun | `OrderStatus`, `PaymentMethod` |
| Trait | PascalCase, often adjective/able | `HasTimestamps`, `Auditable` |
| Abstract class | PascalCase + `Abstract` prefix or base noun | `BaseRepository` |
| Composable (Vue) | camelCase, `use` prefix | `useAuthStore`, `useCartItems` |
| Pinia store | camelCase, `use` prefix + `Store` suffix | `useUserStore` |
| Type / Interface (TS) | PascalCase | `UserPayload`, `ApiResponse` |

**Process:**

1. Extract class/interface/enum names from PHP files:
   ```bash
   grep -rn "^\(class\|interface\|enum\|trait\|abstract class\) " \
     --include="*.php" . | grep -v vendor
   ```
2. Extract from Vue/TS:
   ```bash
   grep -rn "^\(export \)\?\(default \)\?\(class\|interface\|enum\|type\) " \
     --include="*.ts" --include="*.vue" . | grep -v node_modules
   ```
3. Check each name against the rule table above.
4. Flag suffix mismatches (e.g. `UserCtrl` instead of `UserController`).
5. Flag prefix mismatches (e.g. composable missing `use` prefix).

## Check C — Namespace Alignment (Laravel / PSR-4)

**Rule:** The declared namespace must mirror the directory path relative to `app/`.

```
File:      app/Http/Controllers/Api/V1/UserController.php
Namespace: App\Http\Controllers\Api\V1
Class:     UserController
```

**Process:**

1. For each PHP file, read the `namespace` declaration.
2. Derive the expected namespace from the file path using `composer.json` autoload config:
   ```bash
   cat composer.json | grep -A5 '"psr-4"'
   ```
3. Compare declared vs expected namespace.
4. Record mismatches — common patterns to flag:
   - `App\Http\Controller` (missing plural `s`)
   - Namespace uses wrong casing (`app\Http\` instead of `App\Http\`)
   - Namespace doesn't match directory depth (extra or missing segment)
   - File moved but namespace not updated

## Report

After all three checks, output the following report.

```markdown
# Consistency Check Report
**Project**: [name from composer.json / package.json]
**Stack**: [Laravel | Nuxt | Multi-Repo]
**Scanned**: [N files, M directories]
**Date**: [YYYY-MM-DD]

---

## Summary

| Check | Status | Issues |
|---|---|---|
| A. File & Folder Naming | ✅ Consistent / ❌ Inconsistent | N violations |
| B. Class / Interface / Enum Naming | ✅ Consistent / ❌ Inconsistent | N violations |
| C. Namespace Alignment (PSR-4) | ✅ Consistent / ❌ Inconsistent | N violations |

**Overall**: ✅ All Consistent / ⚠️ Minor Issues / ❌ Inconsistent — action required

---

## Check A — File & Folder Naming

### ✅ Consistent
[List files/folders that pass — group by convention]

### ❌ Violations

| File / Folder | Found | Expected | Context |
|---|---|---|---|
| `app/Http/Controllers/userController.php` | `userController` | `UserController` | Controllers must be PascalCase |
| `components/my_button.vue` | `my_button` | `MyButton` or `my-button` | Components: PascalCase |

---

## Check B — Class / Interface / Enum Naming

### ✅ Consistent
[List passing class names — group by type]

### ❌ Violations

| File | Declared Name | Expected Pattern | Issue |
|---|---|---|---|
| `UserController.php` | `class UserCtrl` | `UserController` | Missing `Controller` suffix |
| `composables/auth.ts` | `export function authUser` | `useAuthUser` | Missing `use` prefix |

---

## Check C — Namespace Alignment

### ✅ Consistent
[List files where namespace matches path]

### ❌ Violations

| File | Declared Namespace | Expected Namespace | Issue |
|---|---|---|---|
| `app/Services/Auth/TokenService.php` | `App\Services\TokenService` | `App\Services\Auth\TokenService` | Missing `Auth` segment |

---

## Standards Reference

### File & Folder Naming
[Filled from the convention tables above, customized to what was actually detected in the project]

### Class / Artifact Naming
[Same — filled from detected patterns]

### Namespace Rules (Laravel)
- Root namespace: `App\` → maps to `app/`
- All namespaces mirror directory path exactly
- Casing must be PascalCase at every segment

---

## Recommended Actions

[Ordered by impact — highest first]

1. **Rename X files** — file naming violations (see Check A table)
2. **Fix Y class names** — suffix/prefix mismatches (see Check B table)
3. **Correct Z namespaces** — PSR-4 misalignments (see Check C table)

> Run `composer dump-autoload` after fixing any PHP namespace/class renames.
> Run a global search-and-replace for class references after renaming.
```

## Quality Rules

- Never report a false positive — if a pattern is ambiguous, mark it `WARN`, not `FAIL`.
- Always show both Found and Expected — never just say "wrong".
- If a project is 100% consistent, say so and output the Standards Reference anyway as a keepable artifact.
- If fewer than 5 files are checked, note the limited scope and suggest a broader scan.
- The Standards Reference section should always be filled and usable as a standalone document.

## Usage

`/ai-os:arch-consistency-check [path]`

Examples:
```
/ai-os:arch-consistency-check
/ai-os:arch-consistency-check backend/app
/ai-os:arch-consistency-check frontend/components
```