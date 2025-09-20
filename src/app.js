// 📦 Built-in and Third-Party
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";

// 🔐 Auth Controller
import login from "#controllers/auth.controller.js";
// 🧩 Custom Middlewares
import auth from "#middlewares/authHandler.js";
import errorHandler from "#middlewares/errorHandler.js";
import logsHandler from "#middlewares/logsHandler.js";
import queryHandler from "#middlewares/queryHandler.js";
import responseHandler from "#middlewares/responseHandler.js";
import transactionHandler from "#middlewares/transactionHandler.js";
import audit from "#src/app/middlewares/auditHandler.js";
// 🚦 Routes
import routes from "#src/routes.js";

// 🚀 App Initialization
const app = express();

// 🔧 Built-in Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// 🧵 Custom Global Middleware (order matters)
app.use(logsHandler);
app.use(queryHandler);
app.use(responseHandler);

// 🌐 Base Health Check Route
app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));

// 🔐 Public Route
app.use("/sign_in", login);

// 🔒 Authentication & Auditing (only for protected routes)
app.use(auth); // JWT or session auth
app.use(audit); // track user actions
app.use(transactionHandler); // per request transaction

// 📦 Protected Routes
app.use("", routes);

// ⚠️ 404 Handler (must be after all routes, but before error handler)
app.use((req, res) => {
	return res.status(404).json({ message: "API is running", author: "Omnath Shinde" });
});

// ⚠️ Error Handler (last middleware)
app.use(errorHandler);

// 🚀 Export App
export default app;
