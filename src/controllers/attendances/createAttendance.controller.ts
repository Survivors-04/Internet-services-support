import { Request, Response } from "express";
import { IAttendanceRequest } from "../../interfaces/attendances";
import { createAttendanceService } from "../../services/attendances/createAttendance.service";

export const createAttendanceController = async (
  req: Request,
  res: Response
) => {
  const data: IAttendanceRequest = req.dataAttendance;
  
  const attendance = await createAttendanceService(data);
  return res.status(201).json(attendance);
};
