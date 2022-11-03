import { Request, Response } from "express";
import { deleteInternetPlanService } from "../../services/internet_plan/deleteInternetPlan.service";

export const deleteInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const internetPlanMessage: string = await deleteInternetPlanService(id);

  return res.status(200).json({ message: internetPlanMessage });
};
