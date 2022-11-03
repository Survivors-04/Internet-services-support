import { Request, Response } from "express";
import { createTeamService } from "../../services/teams/createTeam.service";
import { deleteTeamService } from "../../services/teams/deleteTeam.service";

export const deleteTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedTeam = await deleteTeamService(id);

  return res.status(200).json({ message: deletedTeam });
};
