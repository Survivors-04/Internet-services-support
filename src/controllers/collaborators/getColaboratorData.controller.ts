import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { getColaboratorsDataService } from "../../services/colaborator/getColaboratorsData.service";

const getCollaboratorsDataController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const collabs = await getColaboratorsDataService(id);
  return res.status(200).json(instanceToPlain(collabs));
};

export default getCollaboratorsDataController;
