import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { compare } from "bcrypt";

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginService = async ({ email, password }: ILoginRequest) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const collaboratorRepository = AppDataSource.getRepository(Collaborator);
  const supervisorRepository = AppDataSource.getRepository(Supervisor);

  const searchUserOnClient = await clientRepository.findOneBy({
    email: email,
  });

  const searchUserOnCollaborator = await collaboratorRepository.findOneBy({
    email: email,
  });

  const searchUserOnSupervisor = await supervisorRepository.findOneBy({
    email: email,
  });

  let user;
  let role;
 

  if (searchUserOnClient) {
    user = searchUserOnClient;
    role = 1;
  } else if (searchUserOnCollaborator) {
    user = searchUserOnCollaborator;
    role = 2;
  } else if (searchUserOnSupervisor?.is_manager === false) {
    user = searchUserOnSupervisor;
    role = 3;
  } else if (searchUserOnSupervisor?.is_manager === true) {
    user = searchUserOnSupervisor;
    role = 4;
  } else {
    throw new AppError("Wrong email/password", 403);
  }

  if (user.is_active === false) {
    throw new AppError("User not Active", 403);
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: role,
      is_active: user.is_active,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "24h"}
  );

  return token;
};
