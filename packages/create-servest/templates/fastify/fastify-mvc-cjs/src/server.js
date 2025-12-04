const app = require('./app');
const config = require('./app/config');

app.listen({ port: config.port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on http://localhost:${config.port}`);
});
