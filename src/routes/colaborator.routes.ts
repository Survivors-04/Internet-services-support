import { Router } from "express";

import createCollaboratorController from "../controllers/collaborators/createColaborator.controller";
import getCollaboratorsDataController from "../controllers/collaborators/getColaboratorData.controller";
import updateCollaboratorController from "../controllers/collaborators/updateColaborator.controller";
import deleteCollaboratorController from "../controllers/collaborators/deleteColaborator.controller";

const collaboratorRouter = Router();

collaboratorRouter.post("", createCollaboratorController);
collaboratorRouter.get("", getCollaboratorsDataController);
collaboratorRouter.get("/:id", getCollaboratorsDataController);
collaboratorRouter.patch("/:id", updateCollaboratorController);
collaboratorRouter.delete("/:id", deleteCollaboratorController);

export default collaboratorRouter;
