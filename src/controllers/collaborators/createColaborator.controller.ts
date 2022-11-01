import { Request, Response } from 'express'
import { IColaboratorRequest } from "../../interfaces/collaborator";
import { createColaboratorService } from "../../services/colaboratorsServices/createColaborator.service";

const createCollaboratorController = async (req:Request, res:Response) => {

  const data:IColaboratorRequest = req.body;
  const newColaborator = await createColaboratorService(data);
  return res.status(201).json(newColaborator);

};
export default createCollaboratorController;