---
name: audit-policy
version: "1.0.0"
description: "Audits Laravel Controllers and Actions for correct authorization (Policies/Middleware) by cross-referencing the PRD Permission Matrix. Triggers on /ai-os:sec-audit-policy."
---

# Security Agent: Policy Auditor

This skill acts as a security gate, ensuring that all code adheres to the project's authorization rules defined in the PRD.

## Mandates
- **Design Alignment**: The `docs/prd/PRD.md` (Permission Matrix) is the source of truth.
- **Fail-Safe**: If an endpoint has no explicit authorization check but is marked as restricted in the PRD, it is a critical failure.
- **Action-Aware**: Check both Controller-level middleware and Action-level policy checks (e.g., `$this->authorize()` or `Gate::check()`).

## Workflow

### 1. Load Permission Matrix
- Read `docs/prd/PRD.md` and extract the Permission Matrix table.
- Identify which roles have access to which features/actions.

### 2. Analyze Codebase
- Scan `routes/api.php` for middleware protection (e.g., `auth:sanctum`).
- Scan the target Controller or Action for authorization logic:
    - `authorize()` calls.
    - `can()` or `Gate` checks.
    - `Policy` class implementations.

### 3. Cross-Reference Audit
- Compare the PRD's requirement with the actual implementation.
- **Check 1: Authentication**: Is the route protected by `auth` middleware if it's not a public guest action?
- **Check 2: Authorization**: Is there a specific check for the user's role or ownership (Policy)?

### 4. Report Findings
- **PASS**: Logic matches the PRD.
- **WARNING**: Implicit authorization found (e.g., middleware exists but no granular policy).
- **CRITICAL**: No authorization check found for a restricted resource.

## Usage
`/ai-os:sec-audit-policy [FilePath]`

Example:
`/ai-os:sec-audit-policy app/Http/Controllers/ExpenseController.php`
