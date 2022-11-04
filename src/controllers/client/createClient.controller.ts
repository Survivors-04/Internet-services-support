import { Request, Response } from "express";
import { IClient } from "../../interfaces/clients";
import {createClientService} from "../../services/client/createClient.service";
import { instanceToPlain } from "class-transformer";

const createClientController = async (req: Request, res: Response) => {
  const client: IClient = req.body;

  const createdClient = await createClientService(client);
  return res.status(201).json(instanceToPlain(createdClient));
};

export default createClientController;
