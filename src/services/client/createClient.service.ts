import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { IClientRequest } from "../../interfaces/clients";
import { AppError } from "../../errors/appError";
import { hash } from "bcrypt";

export const createClientService = async ({
  name,
  cpf,
  telephone,
  email,
  password,
}: IClientRequest): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clientExists = await clientRepository.findOneBy({
    email,
  });

  if (clientExists) {
    throw new AppError("Email already being used", 400);
  }

  if (!password) {
    throw new AppError("Password is missing", 400);
  }

  const client = clientRepository.create({
    name,
    cpf,
    telephone,
    email,
    password: password,
  });

  await clientRepository.save(client);

  return client;
};
