import { Router } from "express";
import createCollaboratorController from "../controllers/collaborators/createColaborator.controller";
import getCollaboratorDataController from "../controllers/collaborators/getColaboratorData.controller";
import updateCollaboratorController from "../controllers/collaborators/updateColaborator.controller";
import deleteCollaboratorController from "../controllers/collaborators/deleteColaborator.controller";

const collaboratorRouter = Router();

collaboratorRouter.post("", createCollaboratorController);
collaboratorRouter.get("", getCollaboratorDataController);
collaboratorRouter.get("/:id", getCollaboratorDataController);
collaboratorRouter.patch("/:id", updateCollaboratorController);
collaboratorRouter.delete("/:id", deleteCollaboratorController);

export default collaboratorRouter;
