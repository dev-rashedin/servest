# fastify-plugin-esm

A production-ready Fastify backend starter using the Application Factory pattern and plugin-based architecture with ES Modules.

## Features

- **Application Factory**: Follows Fastify best practices for testability and encapsulation.
- **Auto-loading**: Uses `@fastify/autoload` to automatically load plugins and routes from the filesystem.
- **Plugin Encapsulation**: Demonstrates Fastify's powerful scope isolation model.
- **CORS Enabled**: Pre-configured with `@fastify/cors`.
- **Environment Configuration**: Native Node.js `.env` file loading.
- **Logging**: Integrated `pino` logger with pretty-printing for development.
- **Error Handling**: Centralized error handling and consistent API responses.
- **Clean Status Codes**: Utilizes `http-status-toolkit` for standardized HTTP responses.
- **ES Modules**: Uses modern JavaScript `import`/`export` syntax.

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

   The server will start in watch mode, automatically restarting on file changes.

## Scripts

- `npm run dev`: Run in development mode with watch
- `npm start`: Run in production mode

## Usage

- **Port**: The app listens on the port defined in your `.env` file (default: `3000`).
- **Health Check**: Access `http://localhost:3000/` to verify the server status.

## Project Structure

This template uses the standard Fastify directory structure:

- `src/app.js`: The main application factory. This is where you register the main plugins.
- `src/plugins/`: Place for reusable plugins (e.g., database connections, shared utilities). These are loaded first.
- `src/routes/`: Define your API routes here. The folder structure mirrors your URL path (filesystem-based routing).
- `src/server.js`: The entry point that loads the app and starts the server.

## License

MIT
