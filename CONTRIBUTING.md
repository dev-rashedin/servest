```
# Contributing to Servest

Thank you for your interest in contributing! This monorepo contains multiple parts of the Servest ecosystem. This guide will help you get set up and contribute effectively.

---

## Monorepo Structure

root
├── app/                   → Marketing website + UI
├── docs/                  → MDX documentation site
└── packages/
    ├── create-servest/    → Project scaffolding CLI
    └── servest-addons/    → Addons CLI (ESLint, Prettier, Mongoose, etc.)

---

## Requirements

Node: >= 20
pnpm: >= 9

---

## Getting Started

1. Clone the repository
   git clone https://github.com/dev-rashedin/servest.git
   cd servest

2. Install dependencies
   pnpm install

3. Run workspace-aware scripts
   pnpm run build
   pnpm run dev
   pnpm run typecheck
   pnpm run lint
   pnpm run test

---

## Working Within Packages

Build individual packages:
   pnpm --filter create-servest run build
   pnpm --filter servest-addons run build

Run UI:
   pnpm --filter app run dev

Run documentation site:
   pnpm --filter docs run dev

---

## Branching & Pull Requests

All PRs must target:
   development

> Do NOT open PRs against:
   main

Branch naming convention:
   feature/add-new-template
   fix/env-copy-issue
   docs/improve-readme
   chore/refactor-cli-flow

---

## Before Submitting a PR

Run linting:
   pnpm run lint

Run type checking:
   pnpm run typecheck

Run builds to ensure packages compile:
   pnpm run build

Optional: Run tests:
   pnpm run test

---

## Testing CLI Locally

Link packages globally:
   pnpm run build
   pnpm --filter create-servest link --global
   pnpm --filter servest-addons link --global

Use them as if installed from npm:
   create-servest
   servest add ...

Remove links when done:
   pnpm unlink --global create-servest
   pnpm unlink --global servest-addons

---

## Commit Message Guidelines

Preferred format:
   feat: add new express template
   fix: resolve esm import path
   docs: improve contributing instructions
   refactor: simplify directory copier
   test: add env copy coverage
   chore: update dependencies

---

## Contribution Areas

You can contribute by:
   ✅ Improving scaffolding templates
   ✅ Adding new addons to servest-addons
   ✅ Enhancing CLI UX and prompts
   ✅ Expanding MDX documentation
   ✅ Improving the marketing site
   ✅ Fixing bugs or inconsistencies

---

## Issue Reporting Guidelines

Include:
   ✅ What happened
   ✅ Expected behavior
   ✅ Reproduction steps
   ✅ Node & pnpm version
   ✅ Operating system
   ✅ Template used (if relevant)

---

## Communication

If unsure where to contribute:
   ✅ Open an issue
   ✅ Ask for direction
   ✅ Draft a PR and request feedback

---

## ❤️ Thank You!

Your contributions help Servest grow into a better backend tooling ecosystem.
```
