import { Request, Response } from "express";
import { deleteCollaboratorService } from "../../services/colaborator/deleteColaborator.service";

const deleteCollaboratorController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteCollaboratorService(id);
  return res.status(204).send();
};

export default deleteCollaboratorController;
