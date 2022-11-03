import { AppDataSource } from "../../data-source";
import { Team } from "../../entities/team.entity";

export const listingAllTeamsService = async (): Promise<Team[]> => {
  const teamRepository = AppDataSource.getRepository(Team);

  const teams = await teamRepository.find();

  return teams;
};
