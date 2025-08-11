import app from './app'
import config from './app/config';


app.listen(config.port, () => {
  console.log(`Server listening on port http://localhost:${config.port}`);
});
