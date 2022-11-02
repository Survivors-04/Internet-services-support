import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";

export const listClientService = async () => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find();

  return clients;
};
