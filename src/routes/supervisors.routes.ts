import { Router } from "express";
import { createSupervisorsController } from "../controllers/supervisors/createSupervisors.controller";
import { deleteSupervisorControler } from "../controllers/supervisors/deleteSupervisor.controller";
import { listAllSupervisorsController } from "../controllers/supervisors/listAllSupervisors.controller";
import { updateSupervisorController } from "../controllers/supervisors/updateSupervisor.controller";

const supervisorsRoutes = Router();

supervisorsRoutes.post("/", createSupervisorsController);
supervisorsRoutes.get("/", listAllSupervisorsController);
supervisorsRoutes.patch("/:id", updateSupervisorController);
supervisorsRoutes.delete("/:id", deleteSupervisorControler);

export default supervisorsRoutes;