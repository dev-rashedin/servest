# fastify-mvc-ts

A production-ready Fastify TypeScript backend starter using MVC architecture, featuring CORS support and built-in error handling.

## Features

- **MVC Architecture**: Organized structure with `controllers`, `models`, `routes`, `services`, and `middlewares`.
- **Fastify Core**: High-performance framework with built-in logging.
- **TypeScript**: Fully typed codebase for better developer experience.
- **CORS Enabled**: Pre-configured with `@fastify/cors`.
- **Environment Configuration**: Native Node.js `.env` file loading.
- **Clean Status Codes**: Utilizes `http-status-toolkit` for standardized HTTP responses.

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

   The server will start in watch mode using `tsx`, automatically restarting on file changes.

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

## Scripts

- `npm start`: Run in development mode with watch.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start:prod`: Run the built project in production mode.

## License

MIT
