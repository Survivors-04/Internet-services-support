import { Request, Response } from "express";
import { deleteServicesService } from "../../services/services/deleteServices.service";

export const deleteServicesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteServicesService(id);

  return res.status(204).json({ message: "service deleted successfully" });
};
