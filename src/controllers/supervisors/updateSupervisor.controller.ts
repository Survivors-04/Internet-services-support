import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { updateSupervisorService } from "../../services/supervisors/updateSupervisor.service";

export const updateSupervisorController = (req: Request, res: Response) => {
  const { id } = req.params;

  const { telephone, email, is_Manager, password} = req.body;

  const userUpdated = updateSupervisorService({
    id,
    telephone,
    email,
    is_Manager,
    password,
  });

  return res.status(200).json(userUpdated);

};


