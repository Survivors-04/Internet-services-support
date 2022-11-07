import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";
import { ITeamValidateYup } from "../../interfaces/teams";

export const createTeamService = async (
  data: ITeamValidateYup
): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const supervisor = await supervisorsRepository.findOneBy({
    id: data.supervisorId,
  });

  if (!supervisor) throw new AppError("supervisor not found", 409);

  const supervisorAlreadyInTeam = await teamRepository.findOneBy({
    supervisor: supervisor,
  });

  if (supervisorAlreadyInTeam)
    throw new AppError("supervisor is already in a team", 409);

  const team = teamRepository.create({
    id: data.id,
    supervisor: supervisor,
    collaborator: data.collaborator,
  });

  await teamRepository.save(team);

  return team;
};