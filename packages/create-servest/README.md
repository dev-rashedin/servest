# create-servest <a href="https://npmjs.com/package/create-servest"><img src="https://img.shields.io/npm/v/create-servest" alt="npm package"></a>

`create-servest` is a scaffolding tool for quickly setting up modern backend projects. Inspired by [create-vite](https://vitejs.dev/), it allows you to bootstrap projects with or without addons in a streamlined way.

## Features

- Quickly scaffold a backend project
- Optional addons for extended functionality
- Works seamlessly with the `servest` package to integrate additional features

## Installation

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
npm create servest@latest servest-project -- --template express-mvc-ts

# With addons
npm create servest@latest servest-project -- --template express-mvc-ts -a f-auth f-articles mongoose eslint-prettier
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

You can automatically include additional utilities during scaffolding using the `-a` or `--addons` flag:

```bash
npm create servest@latest -- --template express-mvc-ts -a f-auth mongoose eslint-prettier lint-staged
```

This will scaffold the express-mvc-ts project and install the required npm packages to enhance your development workflow.

> Note: If any addon fails, the remaining ones will still be applied. You can re-run the failed addons manually later.

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

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you find bugs or want to add features.

---

## License

MIT License
