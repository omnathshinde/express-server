import "dotenv/config";

import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import logsHandler from "./middlewares/logsHandler.js";

// 🚀 App Initialization
const app = express();

// 🔧 Built-in Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(logsHandler);

app.use("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

export default app;
