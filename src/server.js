import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { pingDB } from "./db.js";

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await pingDB();
        console.log("Database connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error("DB connection failed:", err.message);
        process.exit(1);
    }
})();