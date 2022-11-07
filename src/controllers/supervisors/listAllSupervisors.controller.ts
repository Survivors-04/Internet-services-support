import { listAllSupervisorsService } from "../../services/supervisors/listAllSupervisors.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

export const listAllSupervisorsController = async (
  req: Request,
  res: Response
) => {
  const allSupervisors = await listAllSupervisorsService();

  return res.status(200).json(instanceToPlain(allSupervisors));
};
