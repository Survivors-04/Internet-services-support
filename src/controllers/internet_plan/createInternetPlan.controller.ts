import { Request, Response } from "express";
import { createInternetPlanService } from "../../services/internet_plan/createInternetPlan.service";

export const createInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const dataInternetPlan = req.dataInternetPlan;
  const internetPlan = await createInternetPlanService(dataInternetPlan);

  return res.status(201).json(internetPlan);
};
