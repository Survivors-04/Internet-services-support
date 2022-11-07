import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { ICollaboratorUpdateYup } from "../../interfaces/collaborator";

export const updateColaboratorService = async (
  data: ICollaboratorUpdateYup,
  id: string
): Promise<Collaborator> => {
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);
  const collaborator = await collaboratorsRepo.findOneBy({ id: id });

  if (!collaborator) {
    throw new AppError("Collaborator id not found!", 404);
  }

  const { name, email, telephone, password, isActive } = data;

  await collaboratorsRepo.update(id, {
    name: name && name,
    email: email && email,
    telephone: telephone && telephone,
    password: password && password,
    is_active: isActive && isActive,
  });

  const updatedData = await collaboratorsRepo.findOneBy({ id });

  return updatedData!;
};
