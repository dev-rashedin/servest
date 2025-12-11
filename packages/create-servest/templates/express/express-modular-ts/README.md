# express-modular-ts

A minimal Express backend starter using modular architecture with CORS, dotenv, and built-in error handling via `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing
- MVC folder structure (`controllers`, `models`, `routes`, `services`, `middlewares`, `config`)
- Environment config via `.env` (see `.env.example`)
- 404 and global error handlers out of the box using `express-error-toolkit`
- Clean status codes using `http-status-toolkit`
- Uses ES modules (`import`/`export`) module system by default

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

## Scripts

- `npm run dev`: Start server with auto-reload using ts-node-dev
- `npm start`: Run the compiled server from the dist folder for production
- `npm run build`: Compile TypeScript to JavaScript in the dist folder

5. Project Structure

src/
app/
config/ # Configuration files
middlewares/ # Custom Express middlewares
modules/ # Feature-based modules
utils/ # Helper/util functions (optional)
app.ts # Express app setup
server.ts # Server bootstrap
.env.example # Environment variable example file
.gitignore # Git ignore rules
package.json # Project manifest
tsconfig.json # TypeScript configuration

### Usage

The app listens on the port defined in .env (PORT), defaulting to 3000.
Access the root route at / to check server status.

### Notes

- The folder structure encourages modular feature development inside `modules/`.
- The `express-error-toolkit` handles error middleware out of the box.
- Feel free to customize and expand according to your app’s needs.

License
MIT
