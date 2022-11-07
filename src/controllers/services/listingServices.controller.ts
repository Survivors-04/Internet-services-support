import { Request, Response } from "express";
import { Services } from "../../entities/services.entity";
import { listingServicesService } from "../../services/services/listingServices.service";

export const listingServicesController = async (
  req: Request,
  res: Response
) => {
 
  const services: Services[] = await listingServicesService();

  return res.status(200).json(services);
};
