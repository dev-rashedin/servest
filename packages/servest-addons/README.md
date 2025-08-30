# Servest Addons

[![npm version](https://img.shields.io/npm/v/servest-addons)](https://www.npmjs.com/package/servest-addons)
[![License](https://img.shields.io/npm/l/servest-addons)](LICENSE)

**Servest Addons** is a collection of utilities and integrations designed to enhance your Node.js backend and full-stack projects. Inspired by [shadcn](https://github.com/shadcn), it aims to simplify and accelerate the development workflow by providing pre-configured tools, folder structures, and scripts.

---

## Why Servest Addons?

Backend and full-stack development often involves repetitive setup tasks like configuring ESLint, Prettier, Prisma, Drizzle, or MongoDB. **Servest Addons** removes this overhead by providing a single command to add these utilities to your project, saving time and ensuring consistency.

Whether you're starting a new project or working on an existing one, Servest Addons makes it easy to standardize your setup.

---

## How It Works

### 1. Scaffold a New Project

Use the **[create-servest](https://www.npmjs.com/package/create-servest)** package to quickly scaffold a new backend project:

```bash
npx create-servest@latest my-backend-app
cd my-backend-app
```

### 2. Add Utilities to Your Project

Once your project is ready (or even if you already have an existing project), you can add utilities using **servest-addons**:

```bash
npx servest-addons add <feature>
```

Available features:

| Feature           | Description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `mongoose`        | Adds pre-configured Mongoose setup for MongoDB.                            |
| `eslint`          | Sets up ESLint with recommended rules.                                     |
| `prettier`        | Sets up Prettier formatting.                                               |
| `eslint-prettier` | Integrates ESLint + Prettier for a complete linting & formatting workflow. |
| `prisma`          | Adds Prisma ORM with a starter schema and migration commands.              |
| `drizzle`         | Adds Drizzle ORM with SQLite support.                                      |
| `lint-staged`     | Adds lint-staged + simple-git-hooks for pre-commit checks.                 |

You can run multiple features in one go:

```bash
npx servest-addons add eslint prettier prisma
```

---

## Utilities and Developer Experience

**Servest Addons** comes with:

- Pre-configured **MVC** and **modular architecture** folder structures.
- Automatic installation of dependencies for ESLint, Prettier, Prisma, Drizzle, and Mongoose.
- Scripts added to `package.json` for easy linting, formatting, and database operations.
- Inspired by [shadcn](https://github.com/shadcn) to make backend and full-stack development smoother.

---

## Getting Started

Install **servest-addons** globally (optional) or use `npx`:

```bash
npm install -g servest-addons
# or
npx servest-addons add <feature>
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find bugs or want to add features.

---

## License

MIT License
