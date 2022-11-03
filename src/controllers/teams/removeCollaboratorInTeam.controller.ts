import { Request, Response } from "express";
import { IAddCollaboratorInTeam } from "../../interfaces/teams";
import { removeCollaboratorInTeamService } from "../../services/teams/removeCollaboratorInTeam.service";

export const removeCollaboratorInTeamController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  const dataCollaborator: IAddCollaboratorInTeam =
    req.dataAddCollaboratorInTeam;
  const teamMessage: string = await removeCollaboratorInTeamService(
    id,
    dataCollaborator
  );

  return res.status(200).json({ message: teamMessage });
};
