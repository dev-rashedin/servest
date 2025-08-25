# servest <a href="https://npmjs.com/package/create-servest"><img src="https://img.shields.io/npm/v/create-servest" alt="npm package"></a>

## Scaffolding Your First Backend Project

> **Compatibility Note:**
> Servest requires [Node.js](https://nodejs.org/en/) version 18+. Some templates may require a higher Node.js version.

### Using NPM:

```bash
npm create servest@latest
```

### Using Yarn:

```bash
yarn create servest
```

### Using PNPM:

```bash
pnpm create servest
```

### Using Bun:

```bash
bun create servest
```

Then follow the prompts!

---

### Non-interactive scaffolding

You can directly specify the project name and template via CLI options:

```bash
# Scaffold an Express MVC TypeScript project non-interactively
npm create servest@latest my-backend-app -- --template express-mvc-ts

# With addons
npm create servest@latest my-backend-app -- --template express-mvc-ts -a eslint-prettier mongoose
```

> Tip: Use `.` as the project name to scaffold in the current directory:

```bash
npm create servest@latest . -- --template express-basic-ts
```

---

## Currently Supported Frameworks & Variants

### Express

- `basic-js` — Basic JavaScript
- `basic-ts` — Basic TypeScript
- `mvc-cjs` — MVC CommonJS
- `mvc-esm` — MVC ESM
- `mvc-ts` — MVC TypeScript
- `modular-cjs` — Modular CommonJS
- `modular-esm` — Modular ESM
- `modular-ts` — Modular TypeScript

### Django

- `django-basic` — Django Basic

---

## Addons

After scaffolding, you can automatically install additional utilities using the `-a` or `--addons` flag:

```bash
npm create servest@latest -- --template express-mvc-ts -a eslint-prettier mongoose
```

This will scaffold the `express-mvc-ts` template and run:

```bash
npx add servest@latest eslint-prettier mongoose
```

> Note: If any addon fails, the others will still be executed. You can rerun failed addons manually.

---

## Community Templates

Servest lets you quickly start a backend project using ready-made templates. You’re not limited to the official templates—other community templates can also be used.

To use a community template from GitHub:

```bash
# Copy the template files to a new folder
npx degit user/project my-project
cd my-project

# Install the project dependencies
npm install

# Start the development server
npm run dev
```

> Tip: Some repositories use `main` instead of `master` as their default branch. In that case, add `#main` to the repo name:

```bash
npx degit user/project#main my-project
```
