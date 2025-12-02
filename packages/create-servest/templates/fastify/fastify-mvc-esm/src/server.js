import app from './app.js';
import config from './app/config/index.js';

app.listen({ port: config.port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on http://localhost:${config.port}`);
});
