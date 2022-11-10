import { AppDataSource } from "../../data-source";
import { Team } from "../../entities/team.entity";
import { AppError } from "../../errors/appError";

export const listingTeamByIdService = async (id: string): Promise<Team> => {
  const teamRepository = AppDataSource.getRepository(Team);

  const team = await teamRepository.findOneBy({ id });

  if (!team) throw new AppError("team not found", 404);

  return team!;
};
