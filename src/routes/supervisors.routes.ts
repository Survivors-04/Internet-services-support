import { Router } from "express";
import { createSupervisorsController } from "../controllers/supervisors/createSupervisors.controller";
import { deleteSupervisorControler } from "../controllers/supervisors/deleteSupervisor.controller";
import { listAllSupervisorsController } from "../controllers/supervisors/listAllSupervisors.controller";
import { updateSupervisorController } from "../controllers/supervisors/updateSupervisor.controller";
import {
  supervisorsCreateSchema,
  validateSupervisorsCreate,
} from "../middlewares/validationsInfosYup/validateInfoSupervisors.middleware";
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
supervisorsRoutes.get("/", listAllSupervisorsController);
supervisorsRoutes.patch(
  "/:id",
  validateSupervisorsUpdate(supervisorsUpdateSchema),
  updateSupervisorController
);
supervisorsRoutes.delete("/:id", deleteSupervisorControler);

export default supervisorsRoutes;
