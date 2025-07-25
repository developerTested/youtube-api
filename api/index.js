import { app, port } from "../src/app.js";

// Express server config
app.listen(port, () => {
    console.log('Express server is listening on port %d in %s mode', port, app.settings.env);
});