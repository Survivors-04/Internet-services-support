import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { ICollaborator } from "../../interfaces/collaborator";

const updateColaboratorService = async (data: ICollaborator, id: string) => {
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);
  const collaborator = await collaboratorsRepo.findOneBy({ id: id });

  if (!collaborator) {
    throw new AppError("Collaborator id not found!", 404);
  }

  const { name, email, telephone } = data;

  await collaboratorsRepo.update(id, {
    name: name && name,
    email: email && email,
    telephone: telephone && telephone,
  });

  const updatedData = await collaboratorsRepo.findOneBy({ id });

  return updatedData as unknown as ICollaborator;
};

export { updateColaboratorService };
