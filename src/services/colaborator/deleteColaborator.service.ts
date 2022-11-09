import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { AppError } from "../../errors/appError";

export const deleteCollaboratorService = async (id: string) => {
  const collaboratorsRepo = AppDataSource.getRepository(Collaborator);
  const collaboratorToBeDeleted = await collaboratorsRepo.findOneBy({ id: id });

  if (collaboratorToBeDeleted?.is_active === false) {
    throw new AppError("Collaborator already inative", 400);
  }

  if (!collaboratorToBeDeleted) {
    throw new AppError("Collaborator id not found!", 404);
  }

  await collaboratorsRepo.update(id, { is_active: false });
};
