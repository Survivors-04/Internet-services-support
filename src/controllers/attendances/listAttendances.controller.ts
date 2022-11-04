import { Request, Response } from 'express';
import { listAttendancesService } from '../../services/attendances/listAttendances.service';

export const listAttendancesController = async (req:Request, res:Response) => {

  const { id } = req.params
  const attendances = await listAttendancesService(id);
  return res.status(200).json(attendances); 

};