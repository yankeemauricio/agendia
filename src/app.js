import express from "express";
import eventRoutes from "./routes/eventRoutes.js";
import participantsRoutes from "./routes/participantsRoutes.js";
import logInfomations from "./middlewares/logMiddleware.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import webRoutes from "./routes/webRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(logInfomations);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/api/events", eventRoutes);
app.use("/api/event/participants", participantsRoutes);
app.use("/", webRoutes);

app.use(globalErrorHandler);

export default app;
