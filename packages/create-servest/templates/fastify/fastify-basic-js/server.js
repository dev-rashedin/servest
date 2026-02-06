require('dotenv/config');
const app = require('./app');
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
