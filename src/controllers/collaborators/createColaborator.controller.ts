import { Request, Response } from "express";
import { IColaboratorRequest } from "../../interfaces/collaborator";
import { createColaboratorService } from "../../services/colaborator/createColaborator.service";
import { instanceToPlain } from "class-transformer";

const createCollaboratorController = async (req: Request, res: Response) => {
  const data: IColaboratorRequest = req.body;
  const newColaborator = await createColaboratorService(data);
  return res.status(201).json(instanceToPlain(newColaborator));
};
export default createCollaboratorController;
