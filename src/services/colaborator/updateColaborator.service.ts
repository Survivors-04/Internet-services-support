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

  const { name, email, telephone, password, is_active } = data;
  if (
    data.id !== undefined ||
    data.is_active !== undefined ||
    data.is_supervisor !== undefined
  ) {
    throw new AppError(
      "Cannot edit id, is_active or is_supervisor values",
      401
    );
  }
  await collaboratorsRepo.update(id, {
    name: name && name,
    email: email && email,
    telephone: telephone && telephone,
    password: password && password,
    is_active: is_active && is_active,
  });

  const updatedData = await collaboratorsRepo.findOneBy({ id });

  return updatedData!;
};
