const app = require('./app');
const config = require('./app/config');

app.listen(config.PORT, () => {
  (console.log(`Server listening on port http://localhost:${config.PORT}`));
});
