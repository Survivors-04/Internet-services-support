import { Request, Response } from "express";
import { IInternetPlan } from "../../interfaces/internetPlan";
import { listingAllInternetPlanService } from "../../services/internet_plan/listingAllInternetPlan.service";

export const listingAllInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const internetPlans: IInternetPlan[] = await listingAllInternetPlanService();

  return res.status(200).json(internetPlans);
};
