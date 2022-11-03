import { Request, Response } from "express";
import { Team } from "../../entities/team.entity";
import { listingTeamByIdService } from "../../services/teams/listingTeamById.service";

export const listingTeamByIdSupervisorController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const teams: Team | Team[] = await listingTeamByIdService(id);

  return res.status(200).json(teams);
};
