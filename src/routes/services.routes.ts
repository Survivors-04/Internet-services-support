import { Router } from "express";
import { createServicesController } from "../controllers/services/createServices.controller";
import { deleteServicesController } from "../controllers/services/deleteServices.controller";
import { listingServicesController } from "../controllers/services/listingServices.controller";
import { updateServicesController } from "../controllers/services/updateServices.controller";
import {
  serviceCreateSchema,
  validateServiceCreate,
} from "../middlewares/validationsInfosYup/vaidateInfoServices.middleware";
import {
  serviceUpdateSchema,
  validateServiceUpdate,
} from "../middlewares/validationsInfosYup/validateInfoUpdateService.middleware";

const servicesRoutes = Router();

servicesRoutes.post(
  "",
  validateServiceCreate(serviceCreateSchema),
  createServicesController
);
servicesRoutes.get("", listingServicesController);
servicesRoutes.patch(
  "/:id",
  validateServiceUpdate(serviceUpdateSchema),
  updateServicesController
);
servicesRoutes.delete("/:id", deleteServicesController);

export default servicesRoutes;
