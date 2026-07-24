---
name: orkestra
version: 0.2.0
description: Cross-platform developer workspace manager CLI - register projects with local
  domains, HTTPS, and process management
type: Skill
title: Orkestra
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/orkestra/v0.2/SKILL.md
tags:
- team
- orkestra
- devtools
- cli
timestamp: '2026-07-24T23:00:00Z'
source: ai-os-custom
context: both
---

# Orkestra Skill

Cross-platform, framework-agnostic developer workspace manager CLI. Orchestrates runtime managers, reverse proxies, hosts files, and service managers behind provider interfaces.

## Purpose

Register development projects with local domains (`.dev.com`), HTTPS via mkcert, and manage dev server processes (start, stop, status, logs).

## Trigger Phrases

- "register project with local domain"
- "start dev server"
- "stop dev server"
- "check project status"
- "orkestra" commands
- "local HTTPS development"
- "dev workspace setup"

## Pipeline Position

Development → DevOps → Local Environment Setup

## Commands Reference

### `orkestra init`
Initialize a new project with `.orkestra.yml` config file.

```bash
orkestra init --dir ~/Projects/my-app
```

**Options:**
- `-d, --dir <path>` — Project directory (default: cwd)
- `--domain <domain>` — Custom domain
- `--port <port>` — Dev server port
- `--ssl / --no-ssl` — Enable/disable SSL (default: true)

### `orkestra register`
Register project with hosts, proxy, and SSL.

```bash
orkestra register --dir ~/Projects/my-app --domain my-app.dev.com
```

**Options:**
- `-d, --dir <path>` — Project directory
- `--domain <domain>` — Domain name (default: `<name>.dev.com`)
- `--port <port>` — Dev server port
- `--proxy <proxy>` — Proxy provider (caddy, apache, nginx)

### `orkestra up`
Start dev server with auto-registration.

```bash
orkestra up --dir ~/Projects/my-app
```

**Options:**
- `-d, --dir <path>` — Project directory
- `--port <port>` — Dev server port

**Config override:** Set `startCommand: "pnpm start"` in `.orkestra.yml` to override auto-detection.

### `orkestra down`
Stop dev server.

```bash
orkestra down --dir ~/Projects/my-app
orkestra down --all  # Stop all running servers
```

### `orkestra status`
Show all registered projects with running/stopped status.

```bash
orkestra status
```

### `orkestra remove`
Clean up project (hosts, proxy, certs, config, state).

```bash
orkestra remove --dir ~/Projects/my-app
```

### `orkestra doctor`
Check prerequisites (Caddy, mkcert, Node.js).

```bash
orkestra doctor
```

## Configuration

`.orkestra.yml` example:

```yaml
name: My App
domain: my-app.dev.com
port: 3000
ssl: true
proxy: auto  # auto | caddy | apache | nginx
runtime: auto  # auto | mise | system
startCommand: "pnpm dev"  # Override auto-detected start command
```

## Mandates

1. **Always use `.dev.com` suffix** — not `.test` or `.local`
2. **SSL via mkcert** — not Caddy's `tls internal`
3. **Show defaults in prompts** — let users press Enter to accept
4. **Sudo with stdio: "inherit"** — terminal must show password prompt
5. **Clean up on remove** — hosts, proxy, certs, config, state

## Workflow

1. **First time:** `orkestra init` → `orkestra register` → `orkestra up`
2. **Subsequent:** `orkestra up` (auto-registers if needed)
3. **Check status:** `orkestra status`
4. **Stop:** `orkestra down`
5. **Cleanup:** `orkestra remove`

## Prerequisites

- Node.js >= 22
- Caddy (recommended) or Apache/Nginx/Traefik
- mkcert (`mkcert -install` for trusted local CA)

## Usage

```bash
# Install globally
npm i -g orkestra

# Initialize a project
cd ~/Projects/my-app
orkestra init

# Start with auto-registration
orkestra up

# Check status
orkestra status

# Stop server
orkestra down
```

## Files Modified

- `~/.orkestra/state.json` — Project registry
- `/etc/hosts` — Local domain entries
- `/etc/caddy/Caddyfile` — Proxy configuration
- `/etc/caddy/certs/` — SSL certificates
- `<project>/.orkestra.yml` — Project config
