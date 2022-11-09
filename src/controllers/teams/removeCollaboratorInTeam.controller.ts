import { Request, Response } from "express";
import { IAddCollaboratorInTeam } from "../../interfaces/teams";
import { removeCollaboratorInTeamService } from "../../services/teams/removeCollaboratorInTeam.service";

export const removeCollaboratorInTeamController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const dataCollaborator: IAddCollaboratorInTeam =
    req.dataAddCollaboratorInTeam;
  const teamMessage: string = await removeCollaboratorInTeamService(
    id,
    dataCollaborator
  );

  return res.status(204).json({ message: teamMessage });
};
