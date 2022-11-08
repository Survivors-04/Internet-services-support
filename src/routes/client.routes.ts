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
  addOrRemovePlanInClientSchema,
  validateAddOrRemovePlanInClient,
} from "../middlewares/validationsInfosYup/validateInfoAddPlanInClient.middleware";
import {
  clientCreateSchema,
  validateClientCreate,
} from "../middlewares/validationsInfosYup/validateInfoClient.middleware";
import {
  clientUpdateSchema,
  validateClientUpdate,
} from "../middlewares/validationsInfosYup/validateInfoUpdateClient.middleware";
import verifyCollaboratorRoleMiddleware from "../middlewares/verifyCollaboratorRole.middleware";
import verifyClientRoleMiddleware from "../middlewares/verifyRoles/verifyClientRoles.middleware";
import { verifyOnlyListOwnUserMiddleware } from "../middlewares/verifyRoles/verifyOnlyListOwnUser.middleware";

const routes = Router();

routes.post(
  "",
  validateClientCreate(clientCreateSchema),
  createClientController
);
routes.get(
  "",
  tokenAuthMiddleware,
  verifyClientRoleMiddleware,
  listClientController
);
routes.get(
  "/:id",
  tokenAuthMiddleware,
  // verifyClientRoleMiddleware,
  // verifyCollaboratorRoleMiddleware,
  verifyOnlyListOwnUserMiddleware,
  listClientByIdController
);
routes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyClientRoleMiddleware,
  validateClientUpdate(clientUpdateSchema),
  updateClientController
);
routes.delete(
  "/:id",
  tokenAuthMiddleware,
  // verifyClientRoleMiddleware,
  verifyCollaboratorRoleMiddleware,
  deleteClientController
);
routes.post(
  "/:id/plans",
  tokenAuthMiddleware,
  // verifyClientRoleMiddleware,
  verifyCollaboratorRoleMiddleware,
  validateAddOrRemovePlanInClient(addOrRemovePlanInClientSchema),
  createClientPlanController
);
routes.delete(
  "/:id/plans",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  // verifyClientRoleMiddleware,
  validateAddOrRemovePlanInClient(addOrRemovePlanInClientSchema),
  deleteClientPlanController
);

export default routes;
