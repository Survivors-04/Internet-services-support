import listClientService from "../../services/client/listClients.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const listClientController = async (req: Request, res: Response) => {
  const clients = await listClientService();

  return res.json(instanceToPlain(clients));
};

export default listClientController;
