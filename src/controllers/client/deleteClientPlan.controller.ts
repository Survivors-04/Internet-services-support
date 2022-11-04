import { Request, Response } from "express";
import { deleteClientPlanService } from "../../services/client/deleteClientPlan.service";

const deleteClientPlanController = async (req: Request, res: Response) => {
  const clientId = req.params.clientId;
  const id = req.body.id;

  await deleteClientPlanService(id, clientId);
  return res.status(204).json({
    message: "Client plan deleted",
  });
};

export default deleteClientPlanController;
