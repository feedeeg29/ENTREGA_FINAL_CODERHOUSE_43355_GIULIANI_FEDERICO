import mongoose from "mongoose";
import { dbUser, dbPass, dbHost } from "../utils/dotenv/dotenv.config.js";
import { developmentLogger } from "../utils/Logger/logger.js";

export const URI = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/test?retryWrites=true&w=majority`;

export const connectToDatabase = async () => {

    try {

        const connection = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB")
        developmentLogger.info("Connected to MongoDB");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        developmentLogger.fatal(error)
        throw error;
    }
};

