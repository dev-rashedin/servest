# fastify-basic-js

A minimal Fastify backend starter with CORS and built-in logging using `pino-pretty`.

## Features

- Fastify setup with CORS
- Environment config via `.env` (native Node.js loading)
- Built-in logging with `pino` and pretty printing with `pino-pretty`

## Getting Started

1. Clone the repo or use it as a template for your project.
2. Rename `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

4. Start the dev server:

```bash
npm start
```

### Usage

The app listens on the port defined in .env (PORT), defaulting to 3000.
Access the root route at / to check server status.

### Notes

- The folder structure is set up to help you organize your code clearly.
- Fastify's ecosystem is plugin-based.
- Feel free to customize and expand according to your app’s needs.

License
MIT
