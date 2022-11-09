import { AppDataSource } from "../../data-source";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";

export const deleteTeamService = async (id: string): Promise<string> => {
  const teamRepository = AppDataSource.getRepository(Team);

  const team = await teamRepository.findOneBy({ id });

  if (!team) throw new AppError("team not found", 404);

  await teamRepository.delete({ id });

  return "team successfully deleted";
};
