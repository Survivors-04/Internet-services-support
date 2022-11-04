import { Request, Response } from "express";
import { Team } from "../../entities/team.entity";
import { listingTeamByIdSupervisorService } from "../../services/teams/listingTeamsByIdSupervisor.service";

export const listingTeamByIdSupervisorController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const teams: Team[] = await listingTeamByIdSupervisorService(id);

  return res.status(200).json(teams);
};
