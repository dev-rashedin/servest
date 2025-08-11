import app from "./app.js";
import config from "./app/config/index.js";


app.listen(config.port, () => {
  (console.log(`Server listening on port http://localhost:${config.port}`));
});
