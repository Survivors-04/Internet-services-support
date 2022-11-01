import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/HandleError.middleware";
import collaboratorRouter from "./routes/colaborator.routes";
import clientRoutes from "./routes/client.routes";

const app = express();
app.use(express.json());

app.use("/clients", clientRoutes);

app.use(handleErrorMiddleware);
app.use("/collaborators", collaboratorRouter);

export default app;
