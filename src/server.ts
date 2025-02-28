import express from "express";
import db from "./config/connection.js";

import routes from "./routes/index.js";
db();
// Initial APP/API setup/configuration

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// Parse incoming JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use API routes (SERVER ROUTING)
app.use(routes);
// WE MAKE SURE we CONNECT to the DB before starting the SERVER LISTENING for incoming requests
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
