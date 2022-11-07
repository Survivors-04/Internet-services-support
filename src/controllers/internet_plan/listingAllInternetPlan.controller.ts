import { Request, Response } from "express";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { listingAllInternetPlanService } from "../../services/internet_plan/listingAllInternetPlan.service";

export const listingAllInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const internetPlans: Internet_plan[] = await listingAllInternetPlanService();

  return res.status(200).json(internetPlans);
};
