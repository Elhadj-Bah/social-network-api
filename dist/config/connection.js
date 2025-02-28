"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-api");
        console.log("Database connected successfully");
        return mongoose_1.default.connection;
    }
    catch (error) {
        console.log("Database connection failed");
        console.log(error);
        return mongoose_1.default.connection;
    }
};
exports.default = db;
