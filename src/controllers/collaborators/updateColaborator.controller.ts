import { Request, Response } from "express";
import { updateColaboratorService } from "../../services/colaborator/updateColaborator.service";

const updateCollaboratorController = async (req: Request, res: Response) => {
  const data = req.dataUpdateCollaborator;
  const { id } = req.params;
  const updatedData = await updateColaboratorService(data, id);
  return res.status(200).json(updatedData);
};

export default updateCollaboratorController;
