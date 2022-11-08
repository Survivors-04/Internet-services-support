import { deleteSupervisorService } from "../../services/supervisors/deleteSupervisor.service";
import { Request, Response } from "express";

export const deleteSupervisorControler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const deleteSupervisor: string = await deleteSupervisorService(id);

  return res.status(200).json({ message: deleteSupervisor });
};
