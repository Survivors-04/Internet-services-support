import { Request, Response } from "express";
import { deleteClientService } from "../../services/client/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteClientService(id);
  return res.status(202).json({
    message: "Client deleted",
  });
};

export default deleteClientController;
