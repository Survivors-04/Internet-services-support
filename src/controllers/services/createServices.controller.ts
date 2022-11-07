import { Request, Response } from "express";
import { Services } from "../../entities/services.entity";
import { createServicesService } from "../../services/services/createServices.service";

export const createServicesController = async (req: Request, res: Response) => {
  const dataService: Services = req.dataService;
  const service: Services = await createServicesService(dataService);

  return res.status(201).json(service);
};
