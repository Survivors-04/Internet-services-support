import { Request, Response } from "express";
import { IInternetPlan } from "../../interfaces/internetPlan";
import { updateInternetPlanService } from "../../services/internet_plan/updateInternetPlan.service";

export const updateInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const dataInternetPlan = req.dataUpdateInternetPlan;
  const updatedInternetPlan: IInternetPlan = await updateInternetPlanService(
    id,
    dataInternetPlan
  );

  return res.status(200).json(updatedInternetPlan);
};
