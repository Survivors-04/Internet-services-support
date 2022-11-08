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

  if (!supervisor) throw new AppError("supervisor not found", 404);

  const supervisorAlreadyInTeam = await teamRepository.findOneBy({
    id: supervisor.id,
  });
  console.log(supervisorAlreadyInTeam)

  if (supervisorAlreadyInTeam)
    throw new AppError("supervisor is already in a team", 500);
    // console.log(data.collaborator)

  const team = teamRepository.create({ 
    id: data.id,
    supervisor: supervisor,
    collaborator: data.collaborator,
  });

  await teamRepository.save(team);
  // console.log(team)
  // console.log(team.supervisor.id)
  return team;
};
