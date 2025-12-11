# express-basic-js

A minimal Express backend starter with CORS, dotenv, and built-in error handling using `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing
- Environment config via `.env`
- 404 and global error handlers out of the box using `express-error-toolkit`
- Clean status codes using `http-status-toolkit`

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

- `npm run dev`: Run in development mode with watch
- `npm start`: Run in production mode

### Usage

The app listens on the port defined in .env (PORT), defaulting to 3000.
Access the root route at / to check server status.

### Notes

- The folder structure is set up to help you organize your code clearly.
- The `express-error-toolkit` handles error middleware out of the box.
- Feel free to customize and expand according to your app’s needs.

License
MIT
