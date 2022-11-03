import { Request, Response } from "express";
import { createTeamService } from "../../services/teams/createTeam.service";

export const createTeamController = async (req: Request, res: Response) => {
  const dataTeam = req.dataTeam;
  const team = await createTeamService(dataTeam);

  return res.status(201).json(team);
};
