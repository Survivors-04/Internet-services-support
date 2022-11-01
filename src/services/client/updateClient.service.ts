import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientUpdate } from "../../interfaces/clients";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

const updateClientService = async (
  { telephone, email, password, isActive }: IClientUpdate,
  id: string
) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({
    id,
  });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.update(id, {
    telephone: telephone ? telephone : findClient.telephone,
    email: email ? email : findClient.email,
    password: password ? await hash(password, 10) : findClient.password,
    isActive: isActive ? isActive : findClient.isActive,
  });

  const client = await clientRepository.findOneBy({
    id,
  });

  return client!;
};

export default updateClientService;
