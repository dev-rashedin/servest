# Servest <a href="https://npmjs.com/package/servest"><img src="https://img.shields.io/npm/v/servest" alt="npm package"></a>

**Servest** is a collection of utilities and integrations designed to enhance your Node.js backend and full-stack projects. Inspired by [shadcn](https://github.com/shadcn), it aims to simplify and accelerate the development workflow by providing pre-configured tools, folder structures, and scripts.

---

## Why Servest?

Backend and full-stack development often involves repetitive setup tasks like adding custom files (e.g: auth.route, products.controller, ratings.model etc), configuring ESLint, Prettier, Prisma, Drizzle, or MongoDB. **Servest** removes this overhead by providing a single command to add these utilities to your project, saving time and ensuring consistency.

Whether you're starting a new project or working on an existing one, Servest makes it easy to standardize your setup.

---

## How It Works

### 1. Scaffold a New Project

Use the **[create-servest](https://www.npmjs.com/package/create-servest)** package to quickly scaffold a new backend project:

```bash
npx create-servest@latest my-backend-app  -- --template templateName
cd my-backend-app
```

> For available templates visit [create-servest#readme](https://github.com/dev-rashedin/servest/tree/main/packages/create-servest#readme)

### 2. Add Utilities to Your Project

Once your project is ready (or even if you already have an existing project), you can add utilities using **servest**:

```bash
npx servest add <f-fileName>
```

```bash
npx servest add <feature>
```

```bash
// for example
npx servest@latest add f-auth
// it will create all necessary files according to your template structure (mvc or modular), if the necessary folder does not exist, it will create them as well

npx servest@latest add mongoose
```

Available features:

| Feature           | Description                                                                  |
| ----------------- | ---------------------------------------------------------------------------- |
| `f-fileName`      | Create related files and folder for your project structure (mvc or modular). |
| `mongoose`        | Adds pre-configured Mongoose setup for MongoDB.                              |
| `eslint`          | Sets up ESLint with recommended rules.                                       |
| `prettier`        | Sets up Prettier formatting.                                                 |
| `eslint-prettier` | Integrates ESLint + Prettier for a complete linting & formatting workflow.   |
| `prisma`          | Adds Prisma ORM with a starter schema and migration commands.                |
| `drizzle`         | Adds Drizzle ORM with SQLite support.                                        |
| `lint-staged`     | Adds lint-staged + simple-git-hooks for pre-commit checks.                   |

You can run multiple features in one go:

```bash
npx servest add eslint prettier prisma
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

Install **servest** globally (optional) or use `npx`:

```bash
npm install -g servest
# or
npx servest add <feature>
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find bugs or want to add features.

---

## License

MIT License
