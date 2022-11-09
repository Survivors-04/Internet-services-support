import { Request, Response } from "express";
import { deleteClientService } from "../../services/client/deleteClient.service";

const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params;

  // console.log(id)

  await deleteClientService(id);
  return res.status(204).json({
    message: "Client deleted",
  });
};

export default deleteClientController;
