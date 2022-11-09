import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";
import { IAddCollaboratorInTeam } from "../../interfaces/teams";

export const removeCollaboratorInTeamService = async (
  id: string,
  data: IAddCollaboratorInTeam
): Promise<string> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const collaboratorRepository = AppDataSource.getRepository(Collaborator);

  const team = await teamRepository.findOneBy({ id });
  const collaborator = await collaboratorRepository.findOneBy({
    id: data.collaboratorId,
  });

  if (!team) throw new AppError("team not found", 404);
  if (!collaborator) throw new AppError("collaborator not found", 404);

  const indexCollaborator = team.collaborator.findIndex(
    (elem) => elem.id === data.collaboratorId
  );

  if (indexCollaborator === -1)
    throw new AppError("collaborator is not registered in this team", 409);

  team?.collaborator.splice(indexCollaborator, 1);

  await teamRepository.save(team);
  await collaboratorRepository.save(collaborator);

  return "collaborator successfully removed";
};
