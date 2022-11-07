import { Request, Response } from "express";
import { Team } from "../../entities/team.entity";
import { ITeamValidateYup } from "../../interfaces/teams";
import { createTeamService } from "../../services/teams/createTeam.service";

export const createTeamController = async (req: Request, res: Response) => {
  const dataTeam: ITeamValidateYup = req.dataTeam;
  const team: Team = await createTeamService(dataTeam);

  return res.status(201).json(team);
};
