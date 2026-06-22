---
name: flutter-v3
description: Use this when building or reviewing Flutter Android and iOS apps with feature-layer architecture, Riverpod state, go_router navigation, and adaptive responsive UI.
---

# Flutter 3 (Android and iOS)

## Core Architecture (Version-Locked)

- Use layered flow: Feature -> Controller/Notifier -> Engine/Service -> Repository -> API/Storage.
- Keep widgets presentation-focused; no business or entitlement logic in UI.
- Keep one codebase for Android and iOS with adaptive behavior.

## Required Micro-skill Routing

- architecture: `./architecture/SKILL.md`
- routing: `./routing/SKILL.md`
- state: `./state/SKILL.md`
- data fetching: `./data-fetching/SKILL.md`
- styling: `./styling/SKILL.md`
- responsive: `./responsive/SKILL.md`
- widget testing: `./widget-test/SKILL.md`
- integration testing: `./integration-test/SKILL.md`
- widget preview: `./widget-preview/SKILL.md`
- layout fixing: `./layout-fixing/SKILL.md`
- serialization: `./serialization/SKILL.md`
- localization: `./localization/SKILL.md`

## Auth Routing

- Laravel backend with Sanctum PAT -> `./auth-sanctum/SKILL.md`
- Express/JWT backend -> `./auth-jwt/SKILL.md`

## Do

- Keep AsyncValue-driven UI states explicit for loading/error/data.
- Use typed models and typed repository contracts.
- Use adaptive navigation based on width class.
- Keep side effects and retries outside widgets.

## Don't

- Do not call API directly from widgets.
- Do not mix auth token strategies in one boundary.
- Do not rely on fixed-size layouts for all devices.
