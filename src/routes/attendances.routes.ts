import { Router } from "express";
import { createAttendanceController } from "../controllers/attendances/createAttendance.controller";
import { deleteAttendancesController } from "../controllers/attendances/deleteAttendances.controller";
import { listAttendancesController } from "../controllers/attendances/listAttendances.controller";
import tokenAuthMiddleware from "../middlewares/tokenAuth.middleware";
import {
  attendanceCreateSchema,
  validateAttendanceCreate,
} from "../middlewares/validationsInfosYup/validateInfoAttendance.middleware";
import { verifyCollaboratorRoleMiddleware } from "../middlewares/verifyRoles/verifyCollaborator.middleware";
import { verifySupervisorMiddleware } from "../middlewares/verifyRoles/verifySupervisors.middleware";

const attendancesRouter = Router();

attendancesRouter.post(
  "",
  validateAttendanceCreate(attendanceCreateSchema),
  createAttendanceController
);
attendancesRouter.get(
  "",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listAttendancesController
);
attendancesRouter.get(
  "/:id",
  tokenAuthMiddleware,
  verifyCollaboratorRoleMiddleware,
  listAttendancesController
);
attendancesRouter.get(
  "/collaborators/:id",
  tokenAuthMiddleware,
  verifySupervisorMiddleware,
  listAttendancesController
);
attendancesRouter.delete("/:id", deleteAttendancesController);

export default attendancesRouter;
