# express-modular-js

A minimal Express backend starter using a modular architecture with feature-based folders, CORS, dotenv, and built-in error handling via `express-error-toolkit` and `http-status-toolkit`.

## Features

- Express setup with CORS and JSON/urlencoded body parsing  
- Modular folder structure (`modules` for features, plus `config`, `middlewares`, and `utils`)  
- Environment config via `.env` (see `.env.example`)  
- 404 and global error handlers out of the box using `express-error-toolkit`  
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

## Project Structure
src/
  app/
    config/         # Configuration files
    middlewares/    # Custom Express middlewares
    modules/          # Feature-based modules
    utils/          # Helper/util functions (optional)
  app.js            # Express app setup
  server.js         # Server bootstrap
.env.example        # Environment variable example file
.gitignore          # Git ignore rules
package.json        # Project manifest


## Notes

- The folder structure encourages modular feature development inside `modules/`.  
- The `express-error-toolkit` handles error middleware out of the box.  
- You can add your features under `modules/` manually or via CLI commands.  
+ - Feel free to customize and expand according to your app’s needs.