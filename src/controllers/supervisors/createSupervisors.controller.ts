import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/HandleError.middleware";
import { instanceToPlain } from "class-transformer";
import { createSupervisorService } from "../../services/supervisors/createSupervisor.service";

export const createSupervisorsController = async (
  req: Request,
  res: Response
) => {
  const { name, cpf, telephone, email, is_manager, password } = req.dataSupervisors;
  
  const newSupervisor = await createSupervisorService({
    name,
    cpf,
    telephone,
    email,
    is_manager,
    password,
  });

  return res.status(201).json(instanceToPlain(newSupervisor));
};
