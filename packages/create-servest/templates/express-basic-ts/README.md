# express-basic-ts

A minimal Express backend starter in TypeScript with CORS, dotenv, and built-in error handling using `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing  
- Environment config via `.env` (see `.env.example`)  
- 404 and global error handlers out of the box using `express-error-toolkit`  
- Clean status codes using `http-status-toolkit`  
- Written in TypeScript with ES Modules support  

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

## Scripts
 - npm run start:dev - Start server with auto-reload using ts-node-dev

 - npm run start:prod - Run the compiled server from the dist folder for production 

 - npm run build - Compile TypeScript to JavaScript in the dist folder 

### Usage
The app listens on the port defined in .env (PORT), defaulting to 3000.
Access the root route at / to check server status.

License
MIT