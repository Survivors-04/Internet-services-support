import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/appError";

export const deleteClientService = async (id: string): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id,
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }
  // console.log(client?.is_active)
  if (client?.is_active === false) {
    throw new AppError("This account is disabled", 400);
  }

  client.is_active = false;
  await clientRepository.save(client);

  const returningClient = await clientRepository.findOneBy({
    id,
  });

  console.log(returningClient)

  return returningClient!;
};
