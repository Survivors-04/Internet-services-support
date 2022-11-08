import { Request, Response } from "express";
import { deleteServicesService } from "../../services/services/deleteServices.service";

export const deleteServicesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedService = await deleteServicesService(id);

  return res.status(200).json({ message: deletedService });
};
