import { Request, Response } from "express";
import { listingServicesService } from "../../services/services/listingServices.service";

export const listingServicesController = async (
  req: Request,
  res: Response
) => {
  const services = await listingServicesService();

  return res.status(200).json(services);
};
