import { AppDataSource } from "../../data-source";
import { Supervisor } from "../../entities/supervisor.entity";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";

export const listingTeamByIdSupervisorService = async (
  id: string
): Promise<Team[]> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const supervisorsRepository = AppDataSource.getRepository(Supervisor);

  const teams = await teamRepository.find();
  const supervisor = await supervisorsRepository.findOneBy({ id });

  if (!supervisor) throw new AppError("supervisor not found", 404);

  const teamsWithSupervisor = teams.filter((team) => team.supervisor.id === id);

  if (teamsWithSupervisor.length === 0)
    throw new AppError("supervisor is not part of any team", 404);

  return teamsWithSupervisor;
};
