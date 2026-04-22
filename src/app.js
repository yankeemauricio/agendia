import express from "express";
import eventRoutes from "./routes/eventRoutes.js";
import logInfomations from "./middlewares/logMiddleware.js";

const app = express();

app.use(express.json());
app.use(logInfomations);

app.use("/api/events", eventRoutes);

export default app;
