import { Router } from "express";
import createClientController from "../controllers/client/createClient.controller";
import createClientPlanController from "../controllers/client/createClientPlan.controller";
import deleteClientController from "../controllers/client/deleteClient.controller";
import deleteClientPlanController from "../controllers/client/deleteClientPlan.controller";
import listClientByIdController from "../controllers/client/listClientById.controller";
import listClientController from "../controllers/client/listClients.controller";
import updateClientController from "../controllers/client/updateClient.controller";

const routes = Router();

routes.post("", createClientController);
routes.get("", listClientController);
routes.get("/:id", listClientByIdController);
routes.patch("/:id", updateClientController);
routes.delete("/:id", deleteClientController);
routes.post("/:id/plans", createClientPlanController);
routes.delete("/:id/plans", deleteClientPlanController);

export default routes;
