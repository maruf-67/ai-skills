---
name: orkestra-dev-workflow
version: 0.2.0
description: Development workflow for Orkestra CLI - feature development, testing, and release
type: Skill
title: Orkestra Development Workflow
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/orkestra/v0.2/workflow/SKILL.md
tags:
- team
- orkestra
- workflow
- development
timestamp: '2026-07-24T23:00:00Z'
source: ai-os-custom
context: both
---

# Orkestra Development Workflow

Standardized workflow for developing new features in the Orkestra CLI.

## Purpose

Guide developers through the complete lifecycle of adding features to Orkestra, from planning to release.

## Trigger Phrases

- "add feature to orkestra"
- "develop orkestra command"
- "orkestra enhancement"
- "orkestra bugfix"

## Branch Strategy

```
main          — Stable releases (v1.0, v1.1, ...)
  └── dev     — Integration branch (v0.2.0, v0.3.0, ...)
       └── feat/<name>  — Feature branches
```

## Workflow

### Phase 1: Planning

1. **Check VERSIONING.md** — See what version the feature belongs to
2. **Create feature branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/<feature-name>
   ```

### Phase 2: Implementation

1. **Follow existing patterns** — Check `src/commands/` for similar commands
2. **Use shared utilities**:
   - `src/utils/registration.ts` — Registration logic
   - `src/utils/host-config.ts` — AllowedHosts management
   - `src/utils/exec.ts` — Shell execution
3. **Add to CLI** — Register command in `src/cli.ts`
4. **Update config** — Add new fields to `src/config/schema.ts` if needed

### Phase 3: Testing

1. **Unit tests** — Add to `test/` directory
2. **Run tests**:
   ```bash
   npx vitest run
   ```
3. **Build**:
   ```bash
   npx tsup
   ```

### Phase 4: Integration

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: <description>"
   ```
2. **Push to feature branch**:
   ```bash
   git push -u origin feat/<feature-name>
   ```
3. **Merge to dev**:
   ```bash
   git checkout dev
   git merge feat/<feature-name>
   git push origin dev
   ```

### Phase 5: Release

1. **Test on dev** — Manual testing
2. **Merge to main**:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```
3. **Tag release**:
   ```bash
   git tag v0.3.0
   git push origin v0.3.0
   ```
4. **Update VERSIONING.md** — Document changes

## Mandates

1. **Always branch from `dev`** — Never work directly on `main`
2. **Tests must pass** — `npx vitest run` before merge
3. **Build must succeed** — `npx tsup` before merge
4. **Update VERSIONING.md** — Document new features
5. **Follow naming conventions** — `feat/`, `fix/`, `chore/` prefixes

## File Structure

```
src/
├── cli.ts                 # Command registration
├── commands/              # Command implementations
│   ├── up.ts
│   ├── down.ts
│   ├── status.ts
│   ├── logs.ts
│   ├── register.ts
│   ├── remove.ts
│   ├── init.ts
│   ├── doctor.ts
│   └── list.ts
├── config/
│   ├── schema.ts          # Zod config schema
│   └── loader.ts          # Config loading
├── detection/             # Framework/proxy detection
├── providers/             # Provider implementations
├── state/                 # State management
├── platform/              # OS-specific code
└── utils/                 # Shared utilities
    ├── registration.ts    # Shared registration logic
    ├── host-config.ts     # AllowedHosts management
    ├── exec.ts            # Shell execution
    └── logger.ts          # Logging/spinners
```

## Version Roadmap

| Version | Focus | Status |
|---------|-------|--------|
| v0.2.0 | Process management | Current |
| v0.3.0 | Logs & monitoring | Planned |
| v0.4.0 | Health & multi-project | Planned |
| v0.5.0 | Shell & status | Planned |
| v1.0.0 | Documentation & polish | Planned |

## Usage

```bash
# Start new feature
/ai-os:task-init "Add logs command" feature

# During development
npx vitest run  # Run tests
npx tsup        # Build

# Finish feature
git checkout dev
git merge feat/add-logs
git push origin dev
```
