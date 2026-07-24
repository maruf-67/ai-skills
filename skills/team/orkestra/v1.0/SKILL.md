---
name: orkestra
version: 1.0.0
description: Cross-platform developer workspace manager CLI - register projects with local
  domains, HTTPS, process management, logging, health monitoring, shell, completions,
  and smart installer
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
- cross-platform
timestamp: '2026-07-25T05:00:00Z'
source: ai-os-custom
context: both
---

# Orkestra Skill

Cross-platform, framework-agnostic developer workspace manager CLI. Works on Linux, macOS, and Windows with automatic tool installation.

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
- "local HTTPS development"
- "dev workspace setup"

## Pipeline Position

Development → DevOps → Local Environment Setup

## Quick Start

```bash
npm i -g orkestra

cd ~/Projects/my-app
orkestra init        # Creates config, registers, installs tools if needed
orkestra up          # Starts server
orkestra status      # Shows project status
```

## Commands Reference

### `orkestra init`
Initialize and register project with proxy, hosts, and SSL.

```bash
orkestra init                    # Interactive setup
orkestra init --port 3007        # Specify port
orkestra init --domain my.dev    # Specify domain
```

**Smart Installer:**
- Detects missing tools (Caddy, mkcert)
- Offers to install with user permission
- Platform-aware: brew (macOS), apt/dnf (Linux), choco (Windows)

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
```

### `orkestra shell`
Open shell with project environment variables.

```bash
orkestra shell                 # Open shell in project directory
```

**Environment Variables:**
- `ORKESTRA_PROJECT`, `ORKESTRA_DIR`, `ORKESTRA_DOMAIN`
- `ORKESTRA_PORT`, `ORKESTRA_FRAMEWORK`, `ORKESTRA_PROXY`

### `orkestra completions`
Generate shell completion scripts.

```bash
orkestra completions --shell zsh > ~/.zfunc/_orkestra
orkestra completions --shell bash > /etc/bash_completion.d/orkestra
orkestra completions --shell fish > ~/.config/fish/completions/orkestra.fish
orkestra completions --shell powershell > $PROFILE
```

### `orkestra remove`
Clean up project completely.

```bash
orkestra remove                # Remove everything
```

**Removes:** hosts entry, proxy config, SSL certs, logs, .orkestra directory, .orkestra.yml

### `orkestra doctor`
Check prerequisites and show recommendations.

## Platform Support

| Platform | Proxy | SSL | Completions |
|----------|-------|-----|-------------|
| Linux | Caddy/Apache/Nginx | mkcert | bash/zsh/fish |
| macOS | Caddy/Apache/Nginx | mkcert | bash/zsh/fish |
| Windows | Caddy | mkcert | PowerShell |

## Smart Installer

When tools are missing, orkestra offers to install them:

```
⚠ No proxy detected (Caddy, Nginx, Apache, or Traefik)
? Caddy is not installed. Install it now? (Y/n)
```

**Installation methods:**
- macOS: `brew install caddy`
- Linux: `apt install caddy` / `dnf install caddy`
- Windows: `choco install caddy`

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

## Graceful Degradation

| Scenario | Behavior |
|----------|----------|
| No proxy | Offers to install Caddy |
| No mkcert | Offers to install mkcert |
| No framework | Suggests startCommand config |
| No package manager | Shows install instructions |

## Version History

| Version | Features |
|---------|----------|
| **1.0.0** | Smart installer, cross-platform, PowerShell completions |
| **0.4.0** | Health monitoring, multi-project, shell |
| **0.3.0** | Log capture, --follow, --since |
| **0.2.0** | Process management, auto-registration |
| **0.1.0** | Initial release |
