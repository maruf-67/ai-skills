---
name: orkestra
version: 0.3.0
description: Cross-platform developer workspace manager CLI - register projects with local
  domains, HTTPS, process management, and logging
type: Skill
title: Orkestra
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/orkestra/v0.3/SKILL.md
tags:
- team
- orkestra
- devtools
- cli
- logging
timestamp: '2026-07-24T23:50:00Z'
source: ai-os-custom
context: both
---

# Orkestra Skill

Cross-platform, framework-agnostic developer workspace manager CLI. Orchestrates runtime managers, reverse proxies, hosts files, and service managers behind provider interfaces.

## Purpose

Register development projects with local domains (`.dev.com`), HTTPS via mkcert, manage dev server processes, and capture/view logs.

## Trigger Phrases

- "register project with local domain"
- "start dev server"
- "stop dev server"
- "check project status"
- "view server logs"
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

### `orkestra register`
Register project with hosts, proxy, and SSL.

```bash
orkestra register --dir ~/Projects/my-app --domain my-app.dev.com
```

### `orkestra up`
Start dev server with auto-registration and log capture.

```bash
orkestra up --dir ~/Projects/my-app           # Background mode (logs captured)
orkestra up --dir ~/Projects/my-app -f        # Foreground mode (direct output)
```

**Options:**
- `-d, --dir <path>` — Project directory
- `--port <port>` — Dev server port
- `-f, --foreground` — Run in foreground (stdio inherited, no log capture)

**Config override:** Set `startCommand: "pnpm start"` in `.orkestra.yml`.

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

### `orkestra logs`
View captured server logs.

```bash
orkestra logs                           # Show last 100 entries
orkestra logs -f                        # Follow logs in real-time
orkestra logs --since 5m               # Show logs from last 5 minutes
orkestra logs --since 1h               # Show logs from last hour
orkestra logs --stream stderr          # Show only stderr
orkestra logs -n 50                    # Show last 50 entries
orkestra logs --list                   # List available log files
```

**Options:**
- `-d, --dir <path>` — Project directory
- `-f, --follow` — Follow logs in real-time
- `--since <time>` — Show logs since (e.g., 5m, 1h, 2d, 2024-01-01)
- `--stream <stream>` — Filter by stream (stdout, stderr)
- `-n, --limit <number>` — Number of recent entries to show
- `-l, --list` — List available log files

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

## Logging

Logs are captured when running in background mode (default):

- **Location:** `.orkestra/logs/<project-name>.log`
- **Format:** `[ISO timestamp] [stdout|stderr] message`
- **Rotation:** Automatic at 10MB per file
- **Foreground mode:** No log capture, output goes directly to terminal

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
4. **View logs:** `orkestra logs` or `orkestra logs -f`
5. **Stop:** `orkestra down`
6. **Cleanup:** `orkestra remove`

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

# Start with auto-registration (logs captured)
orkestra up

# Or start in foreground (see output directly)
orkestra up -f

# Check status
orkestra status

# View logs
orkestra logs

# Follow logs in real-time
orkestra logs -f

# Stop server
orkestra down
```
