---
name: orkestra
version: 1.0.0
description: Cross-platform developer workspace manager CLI - register projects with local
  domains, HTTPS, process management, logging, health monitoring, shell, and completions
type: Skill
title: Orkestra
resource: file:///home/almaruf67/Codes/ai-skills/skills/team/orkestra/v1.0/SKILL.md
tags:
- team
- orkestra
- devtools
- cli
- logging
- health
- completions
timestamp: '2026-07-25T00:30:00Z'
source: ai-os-custom
context: both
---

# Orkestra Skill

Cross-platform, framework-agnostic developer workspace manager CLI. Orchestrates runtime managers, reverse proxies, hosts files, and service managers behind provider interfaces.

## Purpose

Register development projects with local domains (`.dev.com`), HTTPS via mkcert, manage dev server processes, capture logs, monitor health, provide shell environments, and offer shell completions.

## Trigger Phrases

- "register project with local domain"
- "start dev server"
- "stop dev server"
- "check project status"
- "view server logs"
- "open project shell"
- "generate shell completions"
- "orkestra" commands
- "local HTTPS development"
- "dev workspace setup"

## Pipeline Position

Development → DevOps → Local Environment Setup

## Commands Reference

### `orkestra init`
Initialize a project with `.orkestra.yml` config file.

### `orkestra register`
Register project with hosts, proxy, and SSL.

### `orkestra up`
Start dev server with auto-registration, log capture, and health monitoring.

```bash
orkestra up                    # Background mode (logs captured, health monitored)
orkestra up -f                 # Foreground mode (direct output)
orkestra up --all              # Start all registered projects
```

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
orkestra status --verbose      # Detailed view
orkestra status --json         # Machine-readable JSON
orkestra status --watch        # Auto-refresh every 2 seconds
```

### `orkestra logs`
View captured server logs.

```bash
orkestra logs                  # Show last 100 entries
orkestra logs -f               # Follow logs in real-time
orkestra logs --since 5m       # Show logs from last 5 minutes
orkestra logs --stream stderr  # Show only stderr
orkestra logs --list           # List available log files
```

### `orkestra shell`
Open shell with project environment variables.

```bash
orkestra shell                 # Open shell in project directory
```

**Environment Variables:**
- `ORKESTRA_PROJECT` — Project name
- `ORKESTRA_DIR` — Project directory
- `ORKESTRA_DOMAIN` — Project domain
- `ORKESTRA_PORT` — Dev server port
- `ORKESTRA_FRAMEWORK` — Detected framework
- `ORKESTRA_PROXY` — Proxy provider
- `ORKESTRA_PID` — Server PID (if running)
- `ORKESTRA_START_COMMAND` — Configured start command

### `orkestra completions`
Generate shell completion scripts.

```bash
orkestra completions --shell zsh   # ZSH completions
orkestra completions --shell bash  # Bash completions
orkestra completions --shell fish  # Fish completions
```

**Installation:**

```bash
# ZSH
orkestra completions zsh > ~/.zfunc/_orkestra

# Bash
orkestra completions bash > /etc/bash_completion.d/orkestra

# Fish
orkestra completions fish > ~/.config/fish/completions/orkestra.fish
```

### `orkestra doctor`
Check prerequisites (Caddy, mkcert, Node.js).

### `orkestra remove`
Clean up project (hosts, proxy, certs, config, state).

### `orkestra list`
List all registered projects.

### `orkestra open`
Open project in browser.

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

## Version History

| Version | Features |
|---------|----------|
| **1.0.0** | Shell completions, documentation, polish |
| **0.4.0** | Health monitoring, multi-project, shell, status enhancements |
| **0.3.0** | Log capture, --follow, --since, --foreground |
| **0.2.0** | Process management (up, down, status), auto-registration |
| **0.1.0** | Initial release (register, remove, list, doctor, init) |
