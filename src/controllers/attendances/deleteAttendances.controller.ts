import { Request, Response } from "express";
import { deleteAttendancesService } from "../../services/attendances/deleteAttendances.service";

export const deleteAttendancesController = async (req:Request, res:Response) =>{
  const { id } = req.params;
  const deleted = await deleteAttendancesService(id);
  return res.status(203).json(deleted);
};
