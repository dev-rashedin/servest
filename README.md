<p align="center">
  <a href="https://servest.vercel.app" target="_blank" rel="noopener noreferrer">
      <img width="180" src="https://github.com/dev-rashedin/servest/blob/main/app/public/logo.svg" alt="Servest logo">
  </a>
</p>
<br/>
<p align="center">
  <a href="https://npmjs.com/package/servest">
    <img src="https://img.shields.io/npm/v/servest.svg" alt="servest version">
  </a>
 <a href="https://npmjs.com/package/create-servest">
<img src="https://img.shields.io/npm/v/create-servest.svg" alt="create-servest version">
</a>
<a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/create-servest.svg" alt="node compatibility"></a>
<a href="https://pr.new/dev-rashedin/servest"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>
<a href="https://github.com/dev-rashedin/servest/discussions"><img src="https://img.shields.io/badge/chat-discussions-blue?style=flat&logo=github" alt="discussion forum"></a>
</p>
<br/>

# Servest ⚡

> **Next Generation Backend Project Starter**

- 💡 Instant Project Bootstrap
- ⚡️ Lightning Fast CLI Commands
- 🛠️ Rich Features for Multiple Frameworks
- 📦 Pre-configured Templates
- 🔩 Modular Architecture
- 🔑 Fully Typed and Extendable

Servest is a **CLI tool and monorepo** for generating starter projects across **multiple backend frameworks and languages**.

It consists of two main packages:

- **[`create-servest`](packages/create-servest):** CLI for generating project templates (currently 8 Express + 1 Django template, more coming).
- **[`servest`](packages/servest-addons):** One-line command tool to add common features to your backend project (e.g., `npx servest@latest add eslint-prettier (e.g. `npx servest@latest add eslint-prettier`).

📖 [Read the Docs](https://servest.vercel.app) to get started.

---

## 🚀 Quick Start

```bash
# Create a new project with a template
npm create servest@latest -- --template express-mvc-ts

# Add a backend addon
npx servest add mongoose eslint-prettier lint-staged

## Or combine them both
npm create servest@latest -- --template express-mvc-ts -addons mongoose eslint-prettier
```

---

## 📦 Packages

| Package                                   | Version (click for changelogs)                                                                                |
| ----------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| [create-servest](packages/create-servest) | [![version](https://img.shields.io/npm/v/create-servest.svg?label=%20)](packages/create-servest/CHANGELOG.md) |
| [servest](packages/servest-addons)        | [![version](https://img.shields.io/npm/v/servest?label=%20)](packages/servest-addons/CHANGELOG.md)            |

---

## 🤝 Contribution

We welcome contributions! Please check out the [Contributing Guide](CONTRIBUTING.md).

---

## 📜 License

[MIT](LICENSE).

<!-- ## 💖 Sponsors

<p align="center">
  <a target="_blank" href="https://github.com/sponsors/dev-rashedin">
    <img alt="sponsors" src="https://sponsors.github.com/dev-rashedin.svg">
  </a>
</p> -->
