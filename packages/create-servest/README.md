# servest <a href="https://npmjs.com/package/servest"><img src="https://img.shields.io/npm/v/servest" alt="npm package"></a>

## Scaffolding Your First Backend Project

> **Compatibility Note:**
> Servest requires [Node.js](https://nodejs.org/en/) version 18+. Some templates may require a higher Node.js version.

With NPM:

```bash
npm create servest@latest
```

With Yarn:

```bash
yarn create servest
```

With PNPM:

```bash
pnpm create servest
```

With Bun:

```bash
bun create servest
```

Then follow the prompts!

<!-- You can also directly specify the project name, type, and variant via additional command line options. For example, to scaffold an Express Basic JS project:

```bash
# npm 7+, extra double-dash is needed:
npm create servest@latest my-backend-app -- --type express --variant basic-js

# yarn
yarn create servest my-backend-app --type express --variant basic-js

# pnpm
pnpm create servest my-backend-app --type express --variant basic-js

# Bun
bun create servest my-backend-app --type express --variant basic-js
``` -->

Currently supported frameworks and variants include:

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

You can use `.` for the project name to scaffold in the current directory.

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

> Tip: Some repositories use main instead of master as their default branch. In that case, add #main to the repo name:

```bash
npx degit user/project#main my-project
```
