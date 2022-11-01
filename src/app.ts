import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/HandleError.middleware";
import clientRoutes from "./routes/client.routes";

const app = express();
app.use(express.json());

export default app;

app.use("/clients", clientRoutes);
app.use(handleErrorMiddleware);

app.listen(3000, () => {
  console.log("Server is running");
});
