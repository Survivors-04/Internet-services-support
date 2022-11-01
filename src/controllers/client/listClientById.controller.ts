import listClientByIdService from "../../services/client/listClientById.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const listClientByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const clients = await listClientByIdService(id);

  return res.json(instanceToPlain(clients));
};

export default listClientByIdController;
