import { Request, Response } from "express";
import { deleteClientPlanService } from "../../services/client/deleteClientPlan.service";

const deleteClientPlanController = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const id = req.dataAddOrRemovePlanInClient;

  await deleteClientPlanService(id, clientId);
  return res.status(204).json({
    message: "Client plan deleted",
  });
};

export default deleteClientPlanController;
