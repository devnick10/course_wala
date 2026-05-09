
import { app } from "./app.js";
import { config } from "./config/index.js";
import { connectDB } from "./lib/db.js";
const port = process.env.PORT || 3000;


async function startServer() {
    await connectDB()
    app.listen(port, () => console.log('Server is working on Port:' + port + ' in ' + config.NODE_ENV + ' Mode.'));
}

startServer()