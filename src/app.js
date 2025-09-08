import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => res.send("API Express with MySQL is running..."));
app.use("/api/users", userRoutes);

// Centralized error handler (last)
app.use(errorHandler);

export default app;