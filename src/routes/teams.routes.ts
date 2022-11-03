import { Router } from "express";
import { addCollaboratorInTeamController } from "../controllers/teams/addCollaboratorInTeam.controller";
import { createTeamController } from "../controllers/teams/createTeam.controller";
import { listingAllTeamsController } from "../controllers/teams/listingAllTeams.controller";
import { removeCollaboratorInTeamController } from "../controllers/teams/removeCollaboratorInTeam.controller";
import {
  addCollaboratorInTeamSchema,
  validateAddCollaboratorInTeam,
} from "../middlewares/validationsInfosYup/validataInfoAddCollaboratorInTeam.middleware";
import {
  teamCreateSchema,
  validateTeamCreate,
} from "../middlewares/validationsInfosYup/validateInfoTeams.middleware";

export const teamsRoutes = Router();

teamsRoutes.post(
  "",
  validateTeamCreate(teamCreateSchema),
  createTeamController
);
teamsRoutes.post(
  "/:id/collaborator",
  validateAddCollaboratorInTeam(addCollaboratorInTeamSchema),
  addCollaboratorInTeamController
);
teamsRoutes.get("", listingAllTeamsController);
teamsRoutes.delete(
  "/:id/collaborator",
  validateAddCollaboratorInTeam(addCollaboratorInTeamSchema),
  removeCollaboratorInTeamController
);
