import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { IColaboratorRequest } from "../../interfaces/collaborator";

export const createColaboratorService = async (
  data: IColaboratorRequest
): Promise<Collaborator> => {
  const { email, cpf } = data;
  const colaboratorsRepo = AppDataSource.getRepository(Collaborator);
  const colaborator = await colaboratorsRepo.findOneBy(
    { cpf: cpf } || { email: email }
  );


  if (colaborator) {
    throw new AppError("CPF or Email already registered!");
  }

  const newColaborator = colaboratorsRepo.create(data);

  await colaboratorsRepo.save(newColaborator);

  return newColaborator;
};
