import { Request, Response } from "express";
import { Client } from "../../entities/client.entity";
import { listingClientsByInternetPlanService } from "../../services/internet_plan/listingClientsByInternetPlan.service";

export const listingClientsByInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const clientsByInternetPlan =
    await listingClientsByInternetPlanService(id);

  return res.status(200).json(clientsByInternetPlan);
};
