# fastify-mvc-ts

A minimal Fastify backend starter using MVC architecture with CORS and built-in error handling.

## Features

- Fastify setup with CORS
- MVC folder structure (`controllers`, `models`, `routes`, `services`, `middlewares`, `config`)
- Environment config via `.env` (see `.env.example`)
- Clean status codes using `http-status-toolkit`
- Uses TypeScript

## Getting Started

1. Clone the repo or use it as a template for your project.
2. Rename `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

## Scripts

- `npm start`: Run in development mode with watch
- `npm run start:prod`: Run in production mode
