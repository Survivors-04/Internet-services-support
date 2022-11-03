import { Request, Response } from "express";
import { createServicesService } from "../../services/services/createServices.service";

export const createServicesController = async (req: Request, res: Response) => {
  const dataService = req.dataService;
  const service = await createServicesService(dataService);

  return res.status(201).json(service);
};
