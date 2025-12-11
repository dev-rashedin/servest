# fastify-plugin-ts

A production-ready Fastify TypeScript backend starter using the Application Factory pattern and plugin-based architecture.

## Features

- **Application Factory**: Follows Fastify best practices for testability and encapsulation.
- **Auto-loading**: Uses `@fastify/autoload` to automatically load plugins and routes from the filesystem.
- **Plugin Encapsulation**: Demonstrates Fastify's powerful scope isolation model.
- **TypeScript**: Fully typed codebase for better developer experience.
- **CORS Enabled**: Pre-configured with `@fastify/cors`.
- **Environment Configuration**: Native Node.js `.env` file loading.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server will start in watch mode using `tsx`, automatically restarting on file changes.

## Usage

- **Port**: The app listens on the port defined in your `.env` file (default: `3000`).
- **Health Check**: Access `http://localhost:3000/` to verify the server status.

## Project Structure

This template uses the standard Fastify directory structure:

- `src/app.ts`: The main application factory. This is where you register the main plugins.
- `src/plugins/`: Place for reusable plugins (e.g., database connections, shared utilities). These are loaded first.
- `src/routes/`: Define your API routes here. The folder structure mirrors your URL path (filesystem-based routing).
- `src/server.ts`: The entry point that loads the app and starts the server.

## Scripts

- `npm run dev`: Run in development mode with watch.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Run the built project in production mode.

## License

MIT
