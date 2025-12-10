# express-mvc-cjs

A minimal Express backend starter using MVC architecture with CORS, dotenv, and built-in error handling via `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing
- MVC folder structure (`controllers`, `models`, `routes`, `services`, `middlewares`, `config`)
- Environment config via `.env` (see `.env.example`)
- 404 and global error handlers out of the box using `express-error-toolkit`
- Clean status codes using `http-status-toolkit`
- Uses CommonJS (`require`/`module.exports`) module system by default

## Getting Started

1. Clone the repo or use it as a template for your project.
2. A `.env` file is automatically created when generating the template. Edit it to adjust environment variables as needed.

```dotenv
PORT=3000
NODE_ENV=development

# Database connection URL (optional)
DB_URL=

# Auth token for authentication (optional)
AUTH_TOKEN=

# JWT secret key for authentication (optional)
JWT_SECRET=

# Client URL (optional)
CLIENT_URL=

# Add other environment variables as needed
```

Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
```

4. Start the dev server:

```bash
npm run dev
```

## Project Structure

src/
app/
config/ # Configuration files
controllers/ # Route handlers / business logic
middlewares/ # Custom Express middlewares
models/ # Database models (empty by default)
routes/ # Express routes
services/ # Business logic and services
utils/ # Helper/util functions (optional)
app.js # Express app setup
server.js # Server bootstrap
.env.example # Environment variable example file
.gitignore # Git ignore rules
package.json # Project manifest

### Usage

The app listens on the port defined in .env (PORT), defaulting to 3000.
Access the root route at / to check server status.

### Notes

- The folder structure is designed to keep your code organized and maintainable following the MVC pattern.
- The `express-error-toolkit` handles error middleware out of the box.
- Feel free to customize and expand according to your app’s needs.

License
MIT
