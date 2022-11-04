import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/HandleError.middleware";
import collaboratorRouter from "./routes/colaborator.routes";
import clientRoutes from "./routes/client.routes";
import servicesRoutes from "./routes/services.routes";
import supervisorsRoutes from "./routes/supervisors.routes";
import { internetPlanRoutes } from "./routes/internet_plan.routes";
import { teamsRoutes } from "./routes/teams.routes";
import { loginRoutes } from "./routes/login.routes";

const app = express();
app.use(express.json());

app.use("/clients", clientRoutes);
app.use("/services", servicesRoutes);
app.use("/plans", internetPlanRoutes);
app.use("/teams", teamsRoutes);

app.use("/collaborators", collaboratorRouter);
app.use("/supervisors", supervisorsRoutes);
app.use("/login", loginRoutes)
app.use(handleErrorMiddleware);

export default app;
