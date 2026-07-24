---
name: orkestra
version: 0.4.0
description: Cross-platform developer workspace manager CLI - register projects with local
  domains, HTTPS, process management, logging, health monitoring, and shell
type: Skill
title: Orkestra
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/orkestra/v0.4/SKILL.md
tags:
- team
- orkestra
- devtools
- cli
- logging
- health
timestamp: '2026-07-25T00:00:00Z'
source: ai-os-custom
context: both
---

# Orkestra Skill

Cross-platform, framework-agnostic developer workspace manager CLI. Orchestrates runtime managers, reverse proxies, hosts files, and service managers behind provider interfaces.

## Purpose

Register development projects with local domains (`.dev.com`), HTTPS via mkcert, manage dev server processes, capture logs, monitor health, and provide shell environments.

## Trigger Phrases

- "register project with local domain"
- "start dev server"
- "stop dev server"
- "check project status"
- "view server logs"
- "open project shell"
- "orkestra" commands
- "local HTTPS development"
- "dev workspace setup"

## Pipeline Position

Development → DevOps → Local Environment Setup

## Commands Reference

### `orkestra init`
Initialize a new project with `.orkestra.yml` config file.

### `orkestra register`
Register project with hosts, proxy, and SSL.

### `orkestra up`
Start dev server with auto-registration, log capture, and health monitoring.

```bash
orkestra up                    # Background mode (logs captured, health monitored)
orkestra up -f                 # Foreground mode (direct output)
orkestra up --all              # Start all registered projects
```

**Options:**
- `-d, --dir <path>` — Project directory
- `--port <port>` — Dev server port
- `-f, --foreground` — Run in foreground (stdio inherited)
- `-a, --all` — Start all registered projects

### `orkestra down`
Stop dev server.

```bash
orkestra down                  # Stop current project
orkestra down --all            # Stop all running servers
```

### `orkestra status`
Show project status with multiple output modes.

```bash
orkestra status                # Compact view
orkestra status --verbose      # Detailed view with all info
orkestra status --json         # Machine-readable JSON
orkestra status --watch        # Auto-refresh every 2 seconds
orkestra status -v -w          # Verbose + watch combined
```

**Options:**
- `--json` — Output as JSON
- `-v, --verbose` — Show detailed information
- `-w, --watch` — Auto-refresh every 2 seconds

### `orkestra logs`
View captured server logs.

```bash
orkestra logs                  # Show last 100 entries
orkestra logs -f               # Follow logs in real-time
orkestra logs --since 5m       # Show logs from last 5 minutes
orkestra logs --stream stderr  # Show only stderr
orkestra logs -n 50            # Show last 50 entries
orkestra logs --list           # List available log files
```

### `orkestra shell`
Open shell with project environment variables.

```bash
orkestra shell                 # Open shell in project directory
orkestra shell -d ~/my-app     # Open shell for specific project
```

**Environment variables set:**
- `ORKESTRA_PROJECT` — Project name
- `ORKESTRA_DIR` — Project directory
- `ORKESTRA_DOMAIN` — Project domain
- `ORKESTRA_PORT` — Dev server port
- `ORKESTRA_FRAMEWORK` — Detected framework
- `ORKESTRA_PROXY` — Proxy provider
- `ORKESTRA_PID` — Server PID (if running)
- `ORKESTRA_START_COMMAND` — Configured start command

### `orkestra remove`
Clean up project (hosts, proxy, certs, config, state).

### `orkestra doctor`
Check prerequisites (Caddy, mkcert, Node.js).

## Configuration

`.orkestra.yml` example:

```yaml
name: My App
domain: my-app.dev.com
port: 3000
ssl: true
proxy: auto
runtime: auto
startCommand: "pnpm dev"
```

## Health Monitoring

When running in background mode, servers are automatically monitored:

- **Health check interval:** 10 seconds
- **Auto-restart:** On unexpected process exit
- **Max restart attempts:** 3
- **Restart delay:** 2 seconds
- **Log capture:** All stdout/stderr captured to files

Health monitoring stops after max restart attempts. Manual restart required.

## Logging

- **Location:** `.orkestra/logs/<project-name>.log`
- **Format:** `[ISO timestamp] [stdout|stderr] message`
- **Rotation:** Automatic at 10MB per file
- **Foreground mode:** No log capture

## Mandates

1. **Always use `.dev.com` suffix**
2. **SSL via mkcert**
3. **Show defaults in prompts**
4. **Sudo with stdio: "inherit"**
5. **Clean up on remove**

## Workflow

1. **First time:** `orkestra init` → `orkestra register` → `orkestra up`
2. **Subsequent:** `orkestra up` (auto-registers)
3. **Check status:** `orkestra status -v`
4. **View logs:** `orkestra logs -f`
5. **Open shell:** `orkestra shell`
6. **Stop:** `orkestra down`

## Prerequisites

- Node.js >= 22
- Caddy (recommended) or Apache/Nginx/Traefik
- mkcert

## Quick Start

```bash
npm i -g orkestra

cd ~/Projects/my-app
orkestra init
orkestra up

orkestra status -v
orkestra logs -f
orkestra shell

orkestra down
```
