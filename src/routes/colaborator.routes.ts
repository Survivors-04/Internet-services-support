import { Router } from "express";

import createCollaboratorController from "../controllers/collaborators/createColaborator.controller";
import getCollaboratorsDataController from "../controllers/collaborators/getColaboratorData.controller";
import updateCollaboratorController from "../controllers/collaborators/updateColaborator.controller";
import deleteCollaboratorController from "../controllers/collaborators/deleteColaborator.controller";
import {
  collaboratorCreateSchema,
  validateCollaboratorCreate,
} from "../middlewares/validationsInfosYup/validateInfoCollaborators.middleware";
import {
  collaboratorUpdateSchema,
  validateColaboratorUpdate,
} from "../middlewares/validationsInfosYup/validateInfoUpdateCollaborator.middleware";

const collaboratorRouter = Router();

collaboratorRouter.post(
  "",
  validateCollaboratorCreate(collaboratorCreateSchema),
  createCollaboratorController
);
collaboratorRouter.get("", getCollaboratorsDataController);
collaboratorRouter.get("/:id", getCollaboratorsDataController);
collaboratorRouter.patch(
  "/:id",
  validateColaboratorUpdate(collaboratorUpdateSchema),
  updateCollaboratorController
);
collaboratorRouter.delete("/:id", deleteCollaboratorController);

export default collaboratorRouter;
