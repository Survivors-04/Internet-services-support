import { Router } from "express";
import { createInternetPlanController } from "../controllers/internet_plan/createInternetPlan.controller";
import { deleteInternetPlanController } from "../controllers/internet_plan/deleteInternetPlan.controller";
import { listingAllInternetPlanController } from "../controllers/internet_plan/listingAllInternetPlan.controller";
import { listingClientsByInternetPlanController } from "../controllers/internet_plan/listingClientsByInternetPlan.controller";
import { updateInternetPlanController } from "../controllers/internet_plan/updateInternetPlan.controller";
import {
  internetPlanCreateSchema,
  validateInternetPlanCreate,
} from "../middlewares/validationsInfosYup/validateInfoInternetPlan.middleware";
import {
  internetPlanUpdateSchema,
  validateInternetPlanUpdate,
} from "../middlewares/validationsInfosYup/validationInfoUpdateInternetPlan.middleware";

export const internetPlanRoutes = Router();

internetPlanRoutes.post(
  "",
  validateInternetPlanCreate(internetPlanCreateSchema),
  createInternetPlanController
);
internetPlanRoutes.get("", listingAllInternetPlanController);
internetPlanRoutes.get("/:id/clients", listingClientsByInternetPlanController);
internetPlanRoutes.patch(
  "/:id",
  validateInternetPlanUpdate(internetPlanUpdateSchema),
  updateInternetPlanController
);
internetPlanRoutes.delete("/:id", deleteInternetPlanController);
