import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientUpdate } from "../../interfaces/clients";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

export const updateClientService = async (
  { name, telephone, email, password }: IClientUpdate,
  id: string
): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id,
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.update(id, {
    name: name ? name : findClient.name,
    telephone: telephone ? telephone : findClient.telephone,
    email: email ? email : findClient.email,
    password: password ? await hash(password, 10) : findClient.password,
  });

  const client = await clientRepository.findOneBy({
    id,
  });

  return client!;
};
