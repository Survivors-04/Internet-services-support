import { Router } from "express";
import { createServicesController } from "../controllers/services/createServices.controller";
import { deleteServicesController } from "../controllers/services/deleteServices.controller";
import { listingServicesController } from "../controllers/services/listingServices.controller";
import { updateServicesController } from "../controllers/services/updateServices.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  serviceCreateSchema,
  validateServiceCreate,
} from "../middlewares/validationsInfosYup/vaidateInfoServices.middleware";
import {
  serviceUpdateSchema,
  validateServiceUpdate,
} from "../middlewares/validationsInfosYup/validateInfoUpdateService.middleware";
import { verifyCollaboratorRoleMiddleware } from "../middlewares/verifyRoles/verifyCollaborator.middleware";

const servicesRoutes = Router();

servicesRoutes.post(
  "",
  validateServiceCreate(serviceCreateSchema),
  createServicesController
);
servicesRoutes.get(
  "",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listingServicesController
);
servicesRoutes.patch(
  "/:id",
  validateServiceUpdate(serviceUpdateSchema),
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  updateServicesController
);
servicesRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  deleteServicesController
);

export default servicesRoutes;
