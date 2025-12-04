# fastify-plugin-ts

A Fastify application using the standard plugin-based architecture (Application Factory pattern) with TypeScript.

## Structure

- `src/app.ts`: The main application plugin.
- `src/plugins/`: Reusable plugins (loaded automatically).
- `src/routes/`: Route definitions (loaded automatically).
- `src/server.ts`: Entry point to start the server.

## Features

- **TypeScript Support**: Fully typed with `tsconfig.json` configured.
- **Auto-loading**: Uses `@fastify/autoload` to load plugins and routes from the filesystem.
- **Encapsulation**: Demonstrates Fastify's encapsulation model.
- **Standard Plugins**: Includes `@fastify/cors` and `@fastify/sensible`.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   npm start
   ```

## Scripts

- `npm start`: Run in development mode with watch
- `npm run start:prod`: Run in production mode
