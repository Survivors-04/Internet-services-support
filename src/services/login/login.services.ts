import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Collaborator } from "../../entities/collaborator.entity";
import { Supervisor } from "../../entities/supervisor.entity";
import { AppError } from "../../errors/appError";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { verify } from "crypto";

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
  } else if (searchUserOnSupervisor) {
    user = searchUserOnSupervisor;
    role = 3;
  } else {
    throw new AppError("Usuário não encontrado");
  }

  if(user.is_active === false){
    throw new AppError("A conta está inativa")
  }

  const verifyPassword = await compare(password, user.password);

  if (!verifyPassword) {
    throw new AppError("Incorrect email or password");
  }

  const token = jwt.sign(
    { role: role},
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: user.id }
  );

  return token

};

















// searchUserOnClient?

// user = searchUserOnClient
//     :
// searchUserOnCollaborator?

// user = searchUserOnCollaborator
//     :
// searchUserOnSupervisor?

//  user = searchUserOnSupervisor
//     :
// throw new AppError("Usuário não encontrado")
