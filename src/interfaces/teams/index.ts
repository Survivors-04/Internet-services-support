import { ICollaboratorFullData } from "../collaborator";
import { ISupervisor } from "../supervisors";

export interface ITeamRequest {
  supervisorId: string;
}

export interface ITeam {
  id: string;
  supervisor: ISupervisor;
  collaborator: ICollaboratorFullData[];
}

export interface ITeamValidateYup {
  id: string;
  supervisorId: string;
  collaborator?: ICollaboratorFullData[];
}

export interface IAddCollaboratorInTeam {
  collaboratorId: string;
}
