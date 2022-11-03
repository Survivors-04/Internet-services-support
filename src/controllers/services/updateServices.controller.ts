import { Request, Response } from "express";
import { IUpdateService } from "../../interfaces/services/index";
import { updateServicesService } from "../../services/services/updateServices.service";

export const updateServicesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: IUpdateService = req.dataUpdateService;
  const service = await updateServicesService(id, data);

  return res.status(200).json(service);
};
