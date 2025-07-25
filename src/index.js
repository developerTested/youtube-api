import { app, port } from "./app.js";

// Express server config
app.listen(port, () => {
  console.log('Express server is listening on port %d in %s mode', port, app.settings.env);
});
