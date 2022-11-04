import { Router } from "express";
import { createAttendanceController } from "../controllers/attendances/createAttendance.controller";
import { deleteAttendancesController } from "../controllers/attendances/deleteAttendances.controller";
import { listAttendancesController } from "../controllers/attendances/listAttendances.controller";

const attendancesRouter = Router();

attendancesRouter.post('', createAttendanceController);
attendancesRouter.get('', listAttendancesController);
attendancesRouter.get('/:id', listAttendancesController);
attendancesRouter.get('/collaborators/:id', listAttendancesController )
attendancesRouter.delete('/:id', deleteAttendancesController);

export default attendancesRouter;