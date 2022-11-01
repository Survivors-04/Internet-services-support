import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/HandleError.middleware";
import collaboratorRouter from "./routes/colaborator";
const app = express();
app.use(express.json());

export default app;

app.use(handleErrorMiddleware);
app.use('/collaborators', collaboratorRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
