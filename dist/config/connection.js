import mongoose from "mongoose";
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/social-network-api");
        console.log("Database connected successfully");
        return mongoose.connection;
    }
    catch (error) {
        console.log("Database connection failed");
        console.log(error);
        return mongoose.connection;
    }
};
export default db;
