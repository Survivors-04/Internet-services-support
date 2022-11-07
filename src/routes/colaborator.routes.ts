import { Router } from "express";

import createCollaboratorController from "../controllers/collaborators/createColaborator.controller";
import getCollaboratorsDataController from "../controllers/collaborators/getColaboratorData.controller";
import updateCollaboratorController from "../controllers/collaborators/updateColaborator.controller";
import deleteCollaboratorController from "../controllers/collaborators/deleteColaborator.controller";
import { verifySupervisorMiddleware } from "../middlewares/verifyRoles/verifySupervisors.middleware";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";

const collaboratorRouter = Router();

collaboratorRouter.post(
  "",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  createCollaboratorController
);
collaboratorRouter.get(
  "",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  getCollaboratorsDataController
);
collaboratorRouter.get(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  getCollaboratorsDataController
);
collaboratorRouter.patch(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  updateCollaboratorController
);
collaboratorRouter.delete(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  deleteCollaboratorController
);

export default collaboratorRouter;
