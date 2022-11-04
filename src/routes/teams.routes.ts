import { Router } from "express";
import { addCollaboratorInTeamController } from "../controllers/teams/addCollaboratorInTeam.controller";
import { createTeamController } from "../controllers/teams/createTeam.controller";
import { deleteTeamController } from "../controllers/teams/deleteTeam.controller";
import { listingAllTeamsController } from "../controllers/teams/listingAllTeams.controller";
import { listingTeamByIdController } from "../controllers/teams/listingTeamById.controller";
import { listingTeamByIdSupervisorController } from "../controllers/teams/listingTeamsByIdSupervisor.controller";
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
teamsRoutes.get("/:id", listingTeamByIdController);
teamsRoutes.get("/supervisor/:id", listingTeamByIdSupervisorController);
teamsRoutes.delete("/:id", deleteTeamController);
teamsRoutes.delete(
  "/:id/collaborator",
  validateAddCollaboratorInTeam(addCollaboratorInTeamSchema),
  removeCollaboratorInTeamController
);
