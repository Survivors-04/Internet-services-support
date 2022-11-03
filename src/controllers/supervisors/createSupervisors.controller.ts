import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";
import { instanceToPlain } from "class-transformer";
import { createSupervisorService } from "../../services/supervisors/createSupervisor.service";

export const createSupervisorsController = async (req: Request, res: Response) => {
  const { name, cpf, telephone, email, is_manager, password, is_active } =
    req.body;
  try {
    const newSupervisor = await createSupervisorService({
      name,
      cpf,
      telephone,
      email,
      is_manager,
      password,
      is_active,
    });

    return res.status(200).json(instanceToPlain(newSupervisor));
  } catch (error) {
    if (error instanceof AppError) {
      // handleErrorMiddleware(error, res)
    }
  }
};


