import { Request, Response } from "express";
import { Team } from "../../entities/team.entity";
import { listingAllTeamsService } from "../../services/teams/listingAllTeams.service";

export const listingAllTeamsController = async (
  req: Request,
  res: Response
) => {
  const teams: Team[] = await listingAllTeamsService();

  return res.status(200).json(teams);
};
