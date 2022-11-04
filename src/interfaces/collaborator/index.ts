import { Attendance } from "../../entities/attendance.entity";
import { Supervisor } from "../../entities/supervisor.entity";
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
  isActive: boolean;
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
