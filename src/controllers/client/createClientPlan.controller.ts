import { createClientPlanService } from "../../services/client/createClientPlan.service";
import { Request, Response } from "express";

const createClientPlanController = async (req: Request, res: Response) => {
  const clientId = req.params.id;
  const id = req.body.id;

  await createClientPlanService(id, clientId);
  return res.status(201).json({
    message: "Plan added to the client",
  });
};

export default createClientPlanController;
