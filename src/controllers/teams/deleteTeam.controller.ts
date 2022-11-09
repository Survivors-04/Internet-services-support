import { Request, Response } from "express";
import { deleteTeamService } from "../../services/teams/deleteTeam.service";

export const deleteTeamController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedTeam: string = await deleteTeamService(id);

  return res.status(204).json({ message: deletedTeam });
};
