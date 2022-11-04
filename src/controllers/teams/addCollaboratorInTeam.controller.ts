import { Request, Response } from "express";
import { IAddCollaboratorInTeam } from "../../interfaces/teams";
import { addCollaboratorInTeamService } from "../../services/teams/addCollaboratorInTeam.service";

export const addCollaboratorInTeamController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const dataCollaborator: IAddCollaboratorInTeam =
    req.dataAddCollaboratorInTeam;
  const teamMessage: string = await addCollaboratorInTeamService(
    id,
    dataCollaborator
  );

  return res.status(200).json({ message: teamMessage });
};
