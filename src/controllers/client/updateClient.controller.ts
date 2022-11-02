import { Request, Response } from "express";
import { IClientUpdate } from "../../interfaces/clients";
import {updateClientService} from "../../services/client/updateClient.service";

const updateClientController = async (req: Request, res: Response) => {
  const client: IClientUpdate = req.body;
  const id: string = req.params.id;

  const updatedClient = await updateClientService(client, id);

  return res.status(200).json({
    message: "Client updated",
    user: updatedClient,
  });
};

export default updateClientController;
