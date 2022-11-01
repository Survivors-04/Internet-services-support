import { Router } from "express";
import createClientController from "../controllers/client/createClient.controller";
import listClientByIdController from "../controllers/client/listClientById.controller";
import listClientController from "../controllers/client/listClients.controller";

const routes = Router();

routes.post("", createClientController);
routes.get("", listClientController);
routes.get("/:id", listClientByIdController);

export default routes;
