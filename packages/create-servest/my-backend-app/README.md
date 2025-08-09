# express-basic-js

A minimal Express backend starter with CORS, dotenv, and built-in error handling using `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing  
- Environment config via `.env` (see .env.example)
- 404 and global error handlers out of the box  using `express-error-toolkit` 
- Clean status codes using `http-status-toolkit`  

## Getting Started

1. Clone the repo or use it as a template for your project.  
2. Rename `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
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