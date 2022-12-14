import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";
import { Client } from "../../entities/client.entity";

export const listClientByIdService = async (id: string): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id,
  });
  
  if (!client) {
    throw new AppError("Invalid client Id", 404);
  }

  return client;
};
