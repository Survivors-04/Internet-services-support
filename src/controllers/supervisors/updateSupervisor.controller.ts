import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import { updateSupervisorService } from "../../services/supervisors/updateSupervisor.services";

const updateSupervisorController = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { telephone, email, is_Manager, password, is_active } = req.body;

    const userUpdated = updateSupervisorService({
      id,
      telephone,
      email,
      is_Manager,
      password,
      is_active,
    });

    return res.status(200).json(userUpdated);
  } catch (error) {
    if (error instanceof AppError) {
    }
  }
};

export default updateSupervisorController;
