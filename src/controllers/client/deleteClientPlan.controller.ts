import { Request, Response } from "express";
import { deleteClientPlanService } from "../../services/client/deleteClientPlan.service";

const deleteClientPlanController = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { internet_plan_id } = req.body;

  await deleteClientPlanService(internet_plan_id, clientId);
  return res.status(204).json({
    message: "Client deleted",
  });
};

export default deleteClientPlanController;
