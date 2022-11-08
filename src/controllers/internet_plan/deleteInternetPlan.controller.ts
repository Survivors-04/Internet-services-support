import { Request, Response } from "express";
import { deleteInternetPlanService } from "../../services/internet_plan/deleteInternetPlan.service";

export const deleteInternetPlanController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const internetPlanMessage = await deleteInternetPlanService(id);

  return res.status(204).json({ message: "internet plan deleted successfully" });
};
