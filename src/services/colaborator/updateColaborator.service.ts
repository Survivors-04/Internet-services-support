import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";
import { IColaboratorRequest } from "../../interfaces/collaborator";

const updateColaboratorService = async (
  data: IColaboratorRequest,
  id: string
) => {
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

  return updatedData as IColaboratorRequest;
};

export { updateColaboratorService };
