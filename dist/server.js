"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_js_1 = __importDefault(require("./config/connection.js"));
const index_js_1 = __importDefault(require("./routes/index.js"));
(0, connection_js_1.default)();
// Initial APP/API setup/configuration
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Express middleware
// Parse incoming JSON data
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Use API routes (SERVER ROUTING)
app.use(index_js_1.default);
// WE MAKE SURE we CONNECT to the DB before starting the SERVER LISTENING for incoming requests
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
