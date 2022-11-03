import { AppDataSource } from "../../data-source";
import { Collaborator } from "../../entities/collaborator.entity";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";
import {
  IAddCollaboratorInTeam,
  ITeamValidateYup,
} from "../../interfaces/teams";

export const addCollaboratorInTeamService = async (
  id: string,
  data: IAddCollaboratorInTeam
): Promise<string> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const collaboratorRepository = AppDataSource.getRepository(Collaborator);

  const team = await teamRepository.findOneBy({ id });
  const collaborator = await collaboratorRepository.findOneBy({
    id: data.collaboratorId,
  });

  if (!team) throw new AppError("team not found", 409);
  if (!collaborator) throw new AppError("collaborator not found", 409);

  const collaboratorIsAlreadyTeam = team.collaborator.find(
    (elem) => elem.id === collaborator.id
  );

  if (collaboratorIsAlreadyTeam)
    throw new AppError("collaborator is already registered in this team", 409);

  team?.collaborator.push(collaborator!);
  collaborator!.team = team!;

  await teamRepository.save(team);
  await collaboratorRepository.save(collaborator);

  return "collaborator successfully added";
};
