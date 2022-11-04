import { Router } from "express";
import { createAttendanceController } from "../controllers/attendances/createAttendance.controller";
import { deleteAttendancesController } from "../controllers/attendances/deleteAttendances.controller";
import { listAttendancesController } from "../controllers/attendances/listAttendances.controller";
import {
  attendanceCreateSchema,
  validateAttendanceCreate,
} from "../middlewares/validationsInfosYup/validateInfoAttendance.middleware";

const attendancesRouter = Router();

attendancesRouter.post(
  "",
  validateAttendanceCreate(attendanceCreateSchema),
  createAttendanceController
);
attendancesRouter.get("", listAttendancesController);
attendancesRouter.get("/:id", listAttendancesController);
attendancesRouter.get("/collaborators/:id", listAttendancesController);
attendancesRouter.delete("/:id", deleteAttendancesController);

export default attendancesRouter;
