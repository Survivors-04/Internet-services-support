import { Router } from "express";
import createClientController from "../controllers/client/createClient.controller";
import deleteClientController from "../controllers/client/deleteClient.controller";
import listClientByIdController from "../controllers/client/listClientById.controller";
import listClientController from "../controllers/client/listClients.controller";
import updateClientController from "../controllers/client/updateClient.controller";

const routes = Router();

routes.post("", createClientController);
routes.get("", listClientController);
routes.get("/:id", listClientByIdController);
routes.patch("/:id", updateClientController);
routes.delete("/:id", deleteClientController);

export default routes;
