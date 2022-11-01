import { Attendance } from "../../entities/attendance.entity"
import { Team } from "../../entities/team.entity"

export interface IColaboratorResponse{
  id: string;
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  team: Team;
  attendance: Attendance[];
}
export interface ICollaboratorUpdateRequest{
  name: string
  email: string
  telephone: string
} 

export interface IColaboratorRequest extends ICollaboratorUpdateRequest{
  cpf:string
  email: string
  password: string
  isActive: boolean
}