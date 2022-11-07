import { Router } from "express";
import createClientController from "../controllers/client/createClient.controller";
import createClientPlanController from "../controllers/client/createClientPlan.controller";
import deleteClientController from "../controllers/client/deleteClient.controller";
import deleteClientPlanController from "../controllers/client/deleteClientPlan.controller";
import listClientByIdController from "../controllers/client/listClientById.controller";
import listClientController from "../controllers/client/listClients.controller";
import updateClientController from "../controllers/client/updateClient.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  clientCreateSchema,
  validateClientCreate,
} from "../middlewares/validationsInfosYup/validateInfoClient.middleware";
import verifyClientRoleMiddleware from "../middlewares/verifyRoles/verifyClientRoles.middleware";

const routes = Router();

routes.post(
  "",
  validateClientCreate(clientCreateSchema),
  createClientController
);
routes.get("",tokenAuthMiddleware, verifyClientRoleMiddleware, listClientController);
routes.get("/:id",tokenAuthMiddleware, verifyClientRoleMiddleware, listClientByIdController);
routes.patch("/:id",tokenAuthMiddleware,verifyClientRoleMiddleware, updateClientController);
routes.delete("/:id",tokenAuthMiddleware,verifyClientRoleMiddleware, deleteClientController);
routes.post(
  "/:id/plans",tokenAuthMiddleware,
  verifyClientRoleMiddleware,
  createClientPlanController
);
routes.delete(
  "/:id/plans",
  tokenAuthMiddleware,
  verifyClientRoleMiddleware,
  deleteClientPlanController
);

export default routes;
