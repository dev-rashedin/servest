# fastify-basic-js

A minimal, production-ready Fastify backend starter featuring CORS support and optimized logging.

## Features

- **Fastify Core**: Lightweight and high-performance framework.
- **CORS Enabled**: Pre-configured with `@fastify/cors`.
- **Environment Configuration**: Native Node.js `.env` file loading.
- **Logging**: Integrated `pino` logger with pretty-printing for development.

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
   npm start
   ```

   The server will start in watch mode, automatically restarting on file changes.

## Usage

- **Port**: The app listens on the port defined in your `.env` file (default: `3000`).
- **Health Check**: Access `http://localhost:3000/` to verify the server status.

## Project Structure

This template provides a clean foundation for your Fastify applications. The folder structure is designed to be scalable, allowing you to easily add plugins, routes, and services as your project grows.

## License

MIT
