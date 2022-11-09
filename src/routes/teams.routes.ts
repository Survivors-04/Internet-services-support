import { Router } from "express";
import { addCollaboratorInTeamController } from "../controllers/teams/addCollaboratorInTeam.controller";
import { createTeamController } from "../controllers/teams/createTeam.controller";
import { deleteTeamController } from "../controllers/teams/deleteTeam.controller";
import { listingAllTeamsController } from "../controllers/teams/listingAllTeams.controller";
import { listingTeamByIdController } from "../controllers/teams/listingTeamById.controller";
import { listingTeamByIdSupervisorController } from "../controllers/teams/listingTeamsByIdSupervisor.controller";
import { removeCollaboratorInTeamController } from "../controllers/teams/removeCollaboratorInTeam.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  addCollaboratorInTeamSchema,
  validateAddCollaboratorInTeam,
} from "../middlewares/validationsInfosYup/validataInfoAddCollaboratorInTeam.middleware";
import {
  teamCreateSchema,
  validateTeamCreate,
} from "../middlewares/validationsInfosYup/validateInfoTeams.middleware";
import { verifyCollaboratorRoleMiddleware } from "../middlewares/verifyRoles/verifyCollaborator.middleware";
import { verifyManager } from "../middlewares/verifyRoles/verifyManager.middleware";
import { verifySupervisorMiddleware } from "../middlewares/verifyRoles/verifySupervisors.middleware";

export const teamsRoutes = Router();

teamsRoutes.post(
  "",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  validateTeamCreate(teamCreateSchema),
  createTeamController
);
teamsRoutes.post(
  "/:id/collaborator",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  validateAddCollaboratorInTeam(addCollaboratorInTeamSchema),
  addCollaboratorInTeamController
);
teamsRoutes.get(
  "",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listingAllTeamsController
);
teamsRoutes.get(
  "/:id",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listingTeamByIdController
);
teamsRoutes.get(
  "/supervisor/:id",
  tokenAuthMiddleware,
  verifyManager,
  listingTeamByIdSupervisorController
);
teamsRoutes.delete(
  "/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  deleteTeamController
);
teamsRoutes.delete(
  "/:id/collaborator",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  validateAddCollaboratorInTeam(addCollaboratorInTeamSchema),
  removeCollaboratorInTeamController
);
