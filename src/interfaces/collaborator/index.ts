import { Attendance } from "../../entities/attendance.entity";
import { Team } from "../../entities/team.entity";

export interface IColaboratorResponse {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  team: Team;
  attendance: Attendance[];
}

export interface ICollaboratorFullData {
  id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  is_active: boolean;
  attendance: Attendance[];
  team: Team;
}
export interface ICollaboratorUpdateRequest {
  name: string;
  email: string;
  telephone: string;
}
export interface IColaboratorRequest extends ICollaboratorUpdateRequest {
  cpf: string;
  password: string;
  is_active: boolean;
  is_supervisor: boolean;
}

export interface ICollaborator {
  name: string;
  cpf: string;
  telephone: string;
  email: string;
  password: string;
  is_active: true;
}

export interface ICollaboratorLogin {
  email: string;
  password: string;
}

export interface ITeams {
  supervisor_id: string;
  collaborator:[string];
}

export interface ICollaboratorUpdateYup {
  id?: string;
  name?: string;
  telephone?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  is_supervisor?: boolean;
}
