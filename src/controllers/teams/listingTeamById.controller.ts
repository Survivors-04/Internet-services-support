import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { Team } from "../../entities/team.entity";
import { listingTeamByIdService } from "../../services/teams/listingTeamById.service";

export const listingTeamByIdController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const team: Team = await listingTeamByIdService(id);

  return res.status(201).json(instanceToPlain(team));
};
