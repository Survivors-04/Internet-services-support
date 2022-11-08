import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ISupervisorsUpdate } from "../../interfaces/supervisors";
import { updateSupervisorService } from "../../services/supervisors/updateSupervisor.service";

export const updateSupervisorController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const data: ISupervisorsUpdate = req.dataSupervisorsUpdate;

  const userUpdated = await updateSupervisorService(id, data);

  return res.status(200).json(instanceToPlain(userUpdated));
};
