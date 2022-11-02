import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

export const deleteClientService = async (id: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id,
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  if (!client?.isActive) {
    throw new AppError("This account are disabled", 400);
  }

  client.isActive = false;
  await clientRepository.save(client);

  const returningClient = await clientRepository.findOneBy({
    id,
  });

  return returningClient!;
};
