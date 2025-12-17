# fastify-mvc-cjs

A production-ready Fastify backend starter using MVC architecture, featuring CORS support and built-in error handling.

## Features

- **MVC Architecture**: Organized structure with `controllers`, `models`, `routes`, `services`, and `middlewares`.
- **Fastify Core**: High-performance framework with built-in logging.
- **CORS Enabled**: Pre-configured with `@fastify/cors`.
- **Environment Configuration**: Native Node.js `.env` file loading.
- **Clean Status Codes**: Utilizes `http-status-toolkit` for standardized HTTP responses.
- **CommonJS**: Uses standard Node.js `require`/`module.exports`.

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

The project follows the Model-View-Controller (MVC) pattern to keep your code modular and maintainable:

- `src/controllers`: Handle incoming requests and send responses.
- `src/models`: Define data structures and database schemas.
- `src/routes`: Define API endpoints and map them to controllers.
- `src/services`: Contain business logic and data processing.
- `src/middlewares`: Handle request processing tasks like authentication.

## License

MIT
