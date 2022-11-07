import { Router } from "express";
import { createSupervisorsController } from "../controllers/supervisors/createSupervisors.controller";
import { deleteSupervisorControler } from "../controllers/supervisors/deleteSupervisor.controller";
import { listAllSupervisorsController } from "../controllers/supervisors/listAllSupervisors.controller";
import { updateSupervisorController } from "../controllers/supervisors/updateSupervisor.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  supervisorsCreateSchema,
  validateSupervisorsCreate,
} from "../middlewares/validationsInfosYup/validateInfoSupervisors.middleware";

import { verifyManager } from "../middlewares/verifyRoles/verifyManager.middleware";
import {
  supervisorsUpdateSchema,
  validateSupervisorsUpdate,
} from "../middlewares/validationsInfosYup/validateInfoUpdateSupervisors.middlewar";


const supervisorsRoutes = Router();

supervisorsRoutes.post(
  "",
  validateSupervisorsCreate(supervisorsCreateSchema),
  createSupervisorsController
);

supervisorsRoutes.get(
  "/",
  tokenAuthMiddleware,
  verifyManager,
  listAllSupervisorsController
);
supervisorsRoutes.patch(
  "/:id",
  tokenAuthMiddleware,
  verifyManager,
  validateSupervisorsUpdate(supervisorsUpdateSchema),
  updateSupervisorController
);
supervisorsRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifyManager,
  deleteSupervisorControler
);


export default supervisorsRoutes;
