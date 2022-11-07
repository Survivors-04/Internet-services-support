import { Router } from "express";
import { createInternetPlanController } from "../controllers/internet_plan/createInternetPlan.controller";
import { deleteInternetPlanController } from "../controllers/internet_plan/deleteInternetPlan.controller";
import { listingAllInternetPlanController } from "../controllers/internet_plan/listingAllInternetPlan.controller";
import { listingClientsByInternetPlanController } from "../controllers/internet_plan/listingClientsByInternetPlan.controller";
import { updateInternetPlanController } from "../controllers/internet_plan/updateInternetPlan.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  internetPlanCreateSchema,
  validateInternetPlanCreate,
} from "../middlewares/validationsInfosYup/validateInfoInternetPlan.middleware";
import {
  internetPlanUpdateSchema,
  validateInternetPlanUpdate,
} from "../middlewares/validationsInfosYup/validationInfoUpdateInternetPlan.middleware";
import { verifyCollaboratorRoleMiddleware } from "../middlewares/verifyRoles/verifyCollaborator.middleware";
import { verifySupervisorMiddleware } from "../middlewares/verifyRoles/verifySupervisors.middleware";

export const internetPlanRoutes = Router();

internetPlanRoutes.post(
  "",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  validateInternetPlanCreate(internetPlanCreateSchema),
  createInternetPlanController
);
internetPlanRoutes.get("", listingAllInternetPlanController);
internetPlanRoutes.get(
  "/:id/clients",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listingClientsByInternetPlanController
);
internetPlanRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  validateInternetPlanUpdate(internetPlanUpdateSchema),
  updateInternetPlanController
);
internetPlanRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  deleteInternetPlanController
);
