import { Request, Response } from "express";
import { Internet_plan } from "../../entities/internet_plan.entity";
import { IInternetPlanUpdate } from "../../interfaces/internetPlan";
import { updateInternetPlanService } from "../../services/internet_plan/updateInternetPlan.service";

export const updateInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const dataInternetPlan: IInternetPlanUpdate = req.dataUpdateInternetPlan;
  const updatedInternetPlan: Internet_plan = await updateInternetPlanService(
    id,
    dataInternetPlan
  );

  return res.status(200).json(updatedInternetPlan);
};
