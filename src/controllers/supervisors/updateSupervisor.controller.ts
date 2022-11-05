import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { updateSupervisorService } from "../../services/supervisors/updateSupervisor.service";

export const updateSupervisorController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { telephone, email, is_manager, password} = req.body;

  const userUpdated = await updateSupervisorService({
    id,
    telephone,
    email,
    is_manager,
    password,
  });

  return res.status(200).json(userUpdated);

};


