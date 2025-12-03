import app from './app';
import config from './app/config';

app.listen({ port: config.port }, (err, _address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on http://localhost:${config.port}`);
});
